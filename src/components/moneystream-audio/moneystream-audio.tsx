import { Component, Host, h, Listen } from '@stencil/core';
import { Prop, State } from '@vime/core/dist/types/stencil-public-runtime';

@Component({
  tag: 'moneystream-audio',
  styleUrl: 'moneystream-audio.css',
  shadow: true,
})
export class MoneystreamAudio {
  // required to be set on the instance
  @Prop() src: string = undefined
  @Prop() payto: string
  @Prop() duration: string
  @Prop() price: number
  // monetizationstrategy = "required|none"
  @Prop() monetizationstrategy: string = 'required'
  // moneystreamdisplay = "show|hide|hidden"
  @Prop() moneystreamdisplay: string = 'show'
  @Prop() title: string = ''
  @Prop() mediaType: string = 'audio/mp3'
  @State() moneystream: any
  @State() player: any
  private watchdog!: any

  @Listen('monetizationStarted')
  monetizationStartedHandler(event) {
    console.log(event)
  }
  @Listen('monetizationStopped')
  monetizationStoppedHandler(event) {
    console.log(event)
    this.pausePlayer()
  }
  @Listen('monetizationProgress')
  monetizationProgressHandler(event) {
    console.log(event)
  }
  @Listen('monetizationWatchdog')
  monetizationWatchdog(event) {
    console.log(`watchdog`,event)
    if (event.detail === "stop") {
      this.pausePlayer()
    }
    if (event.detail === "timeout") {
      this.pausePlayer()
    }
  }

  private onPlayingChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`playing`,event.detail)
      if (this.monetizationstrategy === 'required') {
        this.moneystream.getStatus().then(
          status => {
            if (status.hasExtension === true) {
              // if amount && duration
              const offer = {
                session: window.location.href,
                amount: this.price,
                denomination: "cent",
                rate: "total",
                duration: this.duration
              }
              this.moneystream.start(offer)
              this.watchdog.start()
            } else {
              this.pausePlayer()
            }
          }
        )
      }
    }
  }

  private onPausedChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`paused`,event.detail)
      this.moneystream.stop()
      this.watchdog.stop()
    }
  }

  pausePlayer() {
    this.player.pause()
  }

  render() {
    return (
      <Host>
        <moneystream-watchdog
          ref={(el) => {this.watchdog = el} }
        ></moneystream-watchdog>
        <div class="colvids">
          <div class={this.moneystreamdisplay === 'hide' || this.moneystreamdisplay === 'hidden' ? 'hidden':'right'}>
                <moneystream-dash id="moneystream"
                payto = {this.payto}
                ref={(el) => { this.moneystream = el }}
                ></moneystream-dash>
          </div>
          <div>
              <moneystream-offer title={this.title} price={`${this.price}`} duration={this.duration}></moneystream-offer>
            </div>
          <div>
            <vime-player controls
              onVPlayingChange={this.onPlayingChange.bind(this)}
              onVPausedChange={this.onPausedChange.bind(this)}
              ref={(el) => { this.player = el }}
            >
              <vime-audio>
                <source data-src={this.src} type={this.mediaType} />
              </vime-audio>
            </vime-player>
          </div>
        </div>
      </Host>
    );
  }

}
