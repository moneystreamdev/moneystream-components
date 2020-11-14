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
  @State() videoMessage: string = ''
  // required to be set on the instance
  @Prop() vid: string = undefined
  // required
  @Prop() payto: string = 'fullcycle@moneybutton.com'
  @Prop() monetizationrequired: boolean = true

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

  private onPlayingChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`playing`,event.detail)
      if (this.monetizationrequired) {
        this.moneystream.getStatus().then(
          status => {
            if (status.hasExtension === true) {
              this.moneystream.start()
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
          <div class="colvids">
            <div class="right">
              <moneystream-dash id="moneystream"
              payto = {this.payto}
              ref={(el) => { this.moneystream = el }}
              ></moneystream-dash>
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
