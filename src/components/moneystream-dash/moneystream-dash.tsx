import { Component, Host, h, State, Listen, Prop, Method, Event, EventEmitter } from '@stencil/core'
import semver from 'semver'
import { getExchange, convertSatoshisToUsd, 
  checkExtension, startMonetization, stopMonetization } from '../../js/moneystream_utils'

const MINIMUM_VERSION = "0.1.20"

@Component({
  tag: 'moneystream-dash',
  styleUrl: 'moneystream-dash.css',
  shadow: true,
})
export class MoneystreamDash {
  @Prop() debug: boolean = false
  @Prop() showControls: boolean = false
  // required
  @Prop() payto: string = 'fullcycle@moneybutton.com'
  // null/pending/monetized/stop
  @State() monetizationstatus:string = null
  // counts up, funding amount for the ongoing channel
  @State() monetizationamount:number = 0
  @State() xtn:any = {name:"MoneyStream",version:"0.0.0",balanceSatoshis:0}
  @State() hasExtension: boolean = false
  @State() messages:string = ''
  @State() exchange: any
  @State() display_amount: number = 0

  private showUpgrade() {
    if (this.hasExtension === false) return false
    if (this.xtn.version === "0.0.0") return false
    return semver.lt(this.xtn.version, MINIMUM_VERSION)
  }

  @Method()
  async getStatus() {
    return {
      hasExtension: this.hasExtension,
      extension: this.xtn,
      monetizationstatus: this.monetizationstatus,
      monetizationamount: this.monetizationamount
    }
  }

  logMessage = (msg) => {
    // console.log(msg)
    this.messages += `${JSON.stringify(msg)}\r\n`
  }

  componentWillLoad() {
    this.addFont()
    checkExtension()
    getExchange().then(exchange => {
      this.exchange = exchange
      this.updateAmount()
    })
  }

  addFont() {
    const fontDeclarationElement: HTMLStyleElement = document.createElement('style');
    fontDeclarationElement.id="moneystreamFont"
    fontDeclarationElement.textContent +=
      '@font-face{font-family:technikusregular;'
      +'src:url(build/technikus-regular-webfont.woff2) format("woff2"),'
      +'url(build/technikus-regular-webfont.woff) format("woff");'
      +'}'
    document.head.append(fontDeclarationElement)
  }

  updateAmount() {
    if (this.xtn.balanceSatoshis) {
      const sats = this.xtn.balanceSatoshis-this.monetizationamount
      this.display_amount = convertSatoshisToUsd(sats, this.exchange)
      this.display_amount = Math.floor(this.display_amount*10000)/10000
    }
  }

  @Event() monetizationStarted: EventEmitter<string>
  monetizationStartedEmit(status: string) {
    this.monetizationStarted.emit(status)
  }
  @Event() monetizationStopped: EventEmitter<string>
  monetizationStoppedEmit(status: string) {
    this.monetizationStopped.emit(status)
  }
  @Event() monetizationProgress: EventEmitter<any>
  monetizationProgressEmit(ev: any) {
    this.monetizationProgress.emit(ev)
  }

  //Listen to message and process
  @Listen('message', { target: 'window' })
  messageHandler(event) {
    //console.log('Received the custom message event: ', ev)
    if (event.source == window &&
      event.data.direction &&
      event.data.direction == "extension-to-browser") {
      // for testing
      this.logMessage(event.data.message)
    }
    if (event.data.command == "info") {
      this.hasExtension = true
      this.xtn = event.data.message
      this.updateAmount()
    } else {
      if (event.data && event.data != "") {
          if (event.data.direction == "browser-to-extension") {
              this.logMessage(event.data.message)
          } else {
              //logMessage(event.data)
          }
      }
    }
    if (event.data.type == "monetizationstart") {
      this.logMessage(event.data)
      this.monetizationstatus = 'pending'
      this.monetizationStartedEmit(this.monetizationstatus)
    }
    if (event.data.type == "monetizationprogress") {
      this.logMessage(event.data)
      this.monetizationamount += parseInt(event.data.detail.amount,10)
      this.updateAmount()
      if (this.monetizationamount > 400) {
          this.monetizationstatus = 'monetized'
      } else {
          this.monetizationstatus = 'pending'
      }
      this.monetizationProgressEmit({
        status: this.monetizationstatus,
        amount: this.monetizationamount
      })
    }
    if (event.data.type == "monetizationstop") {
      this.logMessage(event.data)
      this.monetizationstatus = 'stop'
      this.monetizationStoppedEmit(this.monetizationstatus)
    }
  }

  getStatusClass () {
    if (this.monetizationstatus === 'monetized') {
        return "moneystream-status-monetized"
    } else if (this.monetizationstatus === 'pending') {
        return "moneystream-status-pending"
    } else if (this.monetizationstatus === 'stop') {
        return "moneystream-status-stop"
    } else {
        return "moneystream-status-default"
    }
  }

  @Method()
  async start() { this.onStart() }
  @Method()
  async stop() { this.onStop() }

  onInfo = () => {
    checkExtension()
  }
  onStart = () => {
      startMonetization(window.location.href, this.payto)
  }
  onStop = () => {
      stopMonetization()
  }

  render() {
    return (
      <Host>
        <div class="moneystream">
          <div>
            <a class={this.showUpgrade() ? "moneystream-install": "moneystream-hidden"} href="https://moneystreamdev.github.io/moneystream-project/docs/upgrade" target="_blank"><span id="txtExtensionUpgrade" title={`Your version is old. Click here to upgrade`}>Upgrade</span></a>
            <a class={this.hasExtension ? "moneystream-hidden": "moneystream-install"} href="https://moneystreamdev.github.io/moneystream-project/" target="_blank"><span id="txtExtensionInstall" title={`Click here to install MoneyStream`}>Install</span></a>
            <a class="moneystream" href="https://moneystreamdev.github.io/moneystream-project/" target="_blank"><span id="txtExtensionName" title={`${this.xtn.name} v${this.xtn.version}`}>{this.xtn.name}</span></a>
            <span id="txtExtensionBalance" class="moneystream-balance" title="MoneyStream balance export must be enabled in the extension to see the balance here">{this.display_amount}</span>
            <span id="txtExtensionStatus" class={this.getStatusClass()} title={`MoneyStream Status`}>&#8621;</span>
            <span id="txtPayTo" class="moneystream-payto" title={`moneystreaming to ${this.payto}`}>&#9787;</span>
            <button class={this.showControls===false?'moneystream-button moneystream-hidden':'moneystream-button'} onClick={this.onInfo}>&#x21BB;</button>
            <button class={this.showControls===false?'moneystream-button moneystream-hidden':'moneystream-button'} onClick={this.onStart}>&#x23F5;</button>
            <button class={this.showControls===false?'moneystream-button moneystream-hidden':'moneystream-button'} onClick={this.onStop}>&#x23F9;</button>
          </div>
        </div>
        <pre id='moneystream-messages' class={this.debug===false?'moneystream-hidden':''}>{this.messages}</pre>
      </Host>
    );
  }

}
