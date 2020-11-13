import { Component, Host, h, State, Prop } from '@stencil/core';

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
  @Prop() payTo: string = 'fullcycle@moneybutton.com'

  private onPlayingChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`playing`,event.detail)
      this.moneystream.start()
    }
  }
  private onPausedChange(event: CustomEvent<boolean>) {
    if (event.detail === true) {
      console.log(`paused`,event.detail)
      this.moneystream.stop()
    }
  }

  playVideo() {
    this.player.play()
  }
  pauseVideo() {
    this.player.pause()
  }

  render() {
    return (
      <Host>
          <div class="colvids">
            <div class="right">
              <moneystream-dash id="moneystream"
              payTo = {this.payTo}
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
