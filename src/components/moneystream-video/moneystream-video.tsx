import { Component, Host, h, State, Prop } from '@stencil/core';
import { Listen } from '@vime/core/dist/types/stencil-public-runtime';

@Component({
  tag: 'moneystream-video',
  styleUrl: 'moneystream-video.css',
  shadow: true,
})
export class MoneystreamVideo {
  private player!: HTMLVimePlayerElement
  private moneystream!: any
  private watchdog!: any
  // youtube|file|vimeo
  @Prop() provider:string = 'youtube'
  // required to be set on the instance
  @Prop() vid: string = undefined
  @Prop() type: string = "video/mp4"
  @Prop() mediatitle: string = ''
  @Prop() duration: string
  @Prop() price: number
  // required
  @Prop() payto: string = 'fullcycle@moneybutton.com'
  // monetizationstrategy = "required|none"
  @Prop() monetizationstrategy: string = 'required'
  // moneystreamdisplay = "show|hide|hidden"
  @Prop() moneystreamdisplay: string = 'show'
  @State() videoMessage: string = ''

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

  // playVideo() {
  //   this.player.play()
  // }
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
              <moneystream-offer mediatitle={this.mediatitle} price={`${this.price}`} duration={this.duration}></moneystream-offer>
            </div>
            <div>
              <vime-player controls
                onVPlayingChange={this.onPlayingChange.bind(this)}
                onVPausedChange={this.onPausedChange.bind(this)}
                ref={(el) => { this.player = el }}
              >
                { this.provider === "youtube" ? <vime-youtube videoId={this.vid} /> : null }
                { this.provider === "vimeo" ? <vime-vimeo videoId={this.vid} /> : null }
                { this.provider === "file" || this.provider === "video" ? 
                  <vime-video>
                    <source 
                      data-src={this.vid} 
                      type={this.type} 
                    />
                  </vime-video> 
                  : null 
                }
              </vime-player>
            </div>
          </div>
      </Host>
    )
  }

}
