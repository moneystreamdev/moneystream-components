import { Component, Host, h } from '@stencil/core';
import { Prop, State } from '@vime/core/dist/types/stencil-public-runtime';
import { create_UUID, convertSatoshisToUsd } from '../../js/moneystream_utils'

let FAUCET_URL = `https://cash.bitcoinofthings.com/faucet/`

@Component({
  tag: 'moneystream-ad',
  styleUrl: 'moneystream-ad.css',
  shadow: true,
})
export class MoneystreamAd {
  @Prop() vid = ''
  @Prop() mediatitle = ''
  @Prop() price = 0
  @Prop() duration=''
  @State() player = null
  @State() moneystream = null
  @State() timer = null
  @State() sessionId = null
  @State() status = 'stopped'
  // 23F1 ⏱︎ stopwatch
  icon_playing = '\u23F5' // ⏵︎ forward, next, play
  // 23F8 ⏸︎ pause
  icon_stop = '\u23F9'// ⏹︎ stop
  @State() icon = this.icon_stop
  @State() icon_color = "grey"
  @State() reason = ''
  // ???
  @State() amount = 0
  // ???
  @State() total = 0
  @State() total_formatted = ''
  @State() total_units = ''
  @State() scale = 0
  @State() extensionAddress = null
  @State() payoutTx = null
  exchange = null
  FEE = 3 // TODO: 300
  SAT_PER_CENT = 5000
  MAX_SPEND = 5500

  componentWillUpdate() {
    this.moneystream.getStatus().then(
      status => {
        if (status.hasExtension === true) {
          this.extensionAddress = status.extension.address
        }
      }
    )
    this.moneystream.getExchange().then(x => this.exchange = x)
  }

  private onPlayingChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`playing`,event.detail)
      this.status = 'starting'
      this.reason =''
      this.sessionId = create_UUID()
      this.startTimer()
    }
  }
  private onPausedChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`paused`,event.detail)
      this.stopTimer()
      this.onSendMoney('stop')
    }
  }

  startTimer = () => {
    let t = null
    t = setInterval(()=>{
        this.onTimer()
    },3000)
    this.timer = t
  }
  stopTimer = () => {
      clearInterval(this.timer)
      this.timer = null
  }

  onTimer = async () => {
    console.log(`timer progress`)
    const result = await this.onSendMoney('progress')
    if (result) {
      this.status = result.returnResult
    // amount: this.convertAmount(result.amount)
    }
  }

  onSendMoney = async (method) => {
    if (!this.sessionId) return
    if (!this.extensionAddress) return
    const dto = {
      session: this.sessionId,
      payTo: this.extensionAddress
    }
    const methodToCall = method || 'progress'
    try {
      const response = await fetch(`${FAUCET_URL}${methodToCall}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dto)
      })
      const data = await response.json()
      console.log(data)
      if (data.statusCode && data.statusCode === 500) {
        this.stopTimer()
        this.player.pause()
        await this.stopSession(true, data)
      }
      //TODO: for some reason, first spend comes back as failure/skipped
      if (data.returnResult && data.returnResult === 'success') {
        await this.stopSession(true, data)
      } else {
        if (method != 'stop' && data.returnResult && data.returnResult === 'failure'
          && data.resultDescription == 'broadcast skipped, no payout yet') {
          if (data.amount) this.amount = data.amount
          data.returnResult = 'pending'
          await this.whenReverseMonetizationProgress(data)
      } else
          if (data.returnResult && data.returnResult === 'failure') {
            await this.stopSession(true, data)
          } else {
            if (data.amount) this.amount = data.amount
            await this.whenReverseMonetizationProgress(data)
          }      
      }
      return data
    }
    catch (err) {
      console.error(err)
      await this.stopSession(true, null)
    }
  }

  whenReverseMonetizationProgress = async (payment) => {
    // initialize currency and scale on first progress event
    console.log(this.total)
    if (payment && payment.amount && this.total >= 0) {
      this.scale = payment.assetScale || 8
      this.total_units = 'cents'
    }
    this.showMonetizationState(payment.returnResult)
    // amount is the total cumulative amount
    // TODO: get the payout from progress event
    this.total = Math.max(Number(payment.amount)-this.FEE, 0)
    if (isNaN(this.total)) {
      this.total_formatted='0'
    } else {
      this.total_formatted = (convertSatoshisToUsd(this.total, this.exchange)*100).toFixed(4)
      this.total_units='cents'
    }
    if (payment.amount > this.MAX_SPEND) {
      await this.onSendMoney('stop')
    }
  }

  showMonetizationState = (newState) => {
    console.log(newState)
    let icon = 'question'
    if (newState == "stopped") {
      icon = this.icon_stop
      this.icon_color = 'grey'
    }
    if (newState === "starting") {
      icon = this.icon_playing
      this.icon_color = "grey"
    }
    if (newState === "pending") {
      icon = this.icon_playing
      this.icon_color = "green"
    }
    if (newState === "monetizing") {
      icon = "$"
      this.icon_color = "green"
    }
    if (newState === "failure") {
      icon = "X"
      this.icon_color = "red"
    }
    if (newState == "success") {
      icon = "\u1F44"
      this.icon_color = "green"
    }
    if (icon) {
      // if (this.status != null
      //   && this.status != newState) {
      //     const monIcon = document.querySelector("#monicon")
      //     monIcon.className = `fa fa-${icon}`
      //     (monIcon as any).style.color = `${color}`
      //     (monIcon as any).title=`${newState}`
      // }
      this.status = newState
    }
  }

  stopSession = async (stopImmediately, payment) => {
    let pay = payment
    this.stopTimer()
    if (stopImmediately === false) {
      // this does a final spend and may loop
      pay = await this.onSendMoney('stop')
    }
    console.log(pay)
    if (pay && pay.returnResult && pay.returnResult === 'failure') {
      this.status = pay.returnResult
      this.reason = `Sorry! ${pay.resultDescription}`,
      this.payoutTx = null
      this.sessionId = null
      return 'failure'
    } else if (pay && pay.txid) {
        this.status = `success`
        this.reason = `You got paid!`
        this.payoutTx = pay
        this.sessionId = null
        localStorage.setItem('lastFaucetPayout',
          JSON.stringify({
            txid: pay.txid,
            when: new Date().toUTCString()
          })
        )
        return 'success'
    }
    if (!pay) {
      this.player.pause()
    }
    return null
  }

  render() {
    return (
      <Host>
          <div class="colvids">
            <div class="hidden">
              <moneystream-dash id="moneystream"
              ref={(el) => { this.moneystream = el }}
              ></moneystream-dash>
            </div>
            <div class="ad-dash">
              <div class="col">{this.status}</div>
              <div class="col"><span style={{color:this.icon_color}}>{this.icon}</span></div>
              <div class="col">{this.reason}</div>
              <div class="col right">{this.total_formatted} {this.total_units}</div>
            </div>
            <div class="ad-dash"><moneystream-offer mediatitle={this.mediatitle} price={`${this.price}`} duration={this.duration}></moneystream-offer></div>
            <div>
              <vime-player controls
                onVPlayingChange={this.onPlayingChange.bind(this)}
                onVPausedChange={this.onPausedChange.bind(this)}
                ref={(el) => { this.player = el }}
              >
                <vime-youtube videoId={this.vid} />
              </vime-player>
            </div>
          </div>
      </Host>
    )
  }

}
