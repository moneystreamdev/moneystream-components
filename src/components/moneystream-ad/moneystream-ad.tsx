import { Component, Host, h } from '@stencil/core';
import { Prop, State } from '@vime/core/dist/types/stencil-public-runtime';
import { create_UUID } from '../../js/moneystream_utils'

let FAUCET_URL = `https://cash.bitcoinofthings.com/faucet/`

@Component({
  tag: 'moneystream-ad',
  styleUrl: 'moneystream-ad.css',
  shadow: true,
})
export class MoneystreamAd {
  @Prop() vid = ''
  @State() player = null
  @State() moneystream = null
  @State() timer = null
  @State() sessionId = null
  @State() status = 'stopped'
  @State() reason = 'null'
  @State() amount = 0
  @State() extensionAddress = null

  componentWillUpdate() {
    this.moneystream.getStatus().then(
      status => {
        if (status.hasExtension === true) {
          this.extensionAddress = status.extension.address
        }
      }
    )
  }

  private onPlayingChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`playing`,event.detail)
      this.status = 'starting'
        // reason:'',
        // playing: true,
      this.sessionId = create_UUID()

      // if (!this.hasPayout()) 
      this.startTimer()
    }
  }
  private onPausedChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`paused`,event.detail)
      this.stopTimer()
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
    // if (done) {
    //   console.log(`done`)
    //   stopTimer()
    //   return
    // }
    // authorize faucet to send money to user
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
        //done = true
        this.stopTimer()
        // this.stopVideo()
        await this.stopSession(true, data)
      }
      if (data.returnResult && data.returnResult === 'success') {
        await this.stopSession(true, data)
      } else {
        if (data.returnResult && data.returnResult === 'failure') {
          await this.stopSession(true, data)
        }
      }
      return data
    }
    catch (err) {
      console.error(err)
      await this.stopSession(true, null)
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
      // playing: false,
      // reason:`Sorry! ${pay.resultDescription}`,
      // payoutTx:null,
      this.sessionId = null
      return 'failure'
    } else if (pay && pay.txid) {
        this.status = `success`
        // reason:`You got paid!`,
        // playing: false,
        // payoutTx: pay,
        this.sessionId = null
        localStorage.setItem('lastFaucetPayout',
          JSON.stringify({
            txid: pay.txid,
            when: new Date().toUTCString()
          })
        )
        //EventBus.publish(`whenTransactionReceipt`)
        return 'success'
    }
    if (!pay) {
      //this.stopVideo()
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
            <div>
              <div class="col">{this.status}</div>
              <div class="col">{this.reason}</div>
              <div class="col">{this.amount}</div>
            </div>
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
