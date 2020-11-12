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
  @Prop() videoId

  // connectedCallback() {
  //   console.log(`will load`)
  //   // document.addEventListener('DOMContentLoaded', () => {
  //   //   console.log(`loaded`)
  //     this.makePlayer()
  //     this.playVideo()
  //   // })
  // }

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
        <moneystream-dash id="moneystream"
        ref={(el) => { this.moneystream = el }}
        ></moneystream-dash>
          <div class="colvids">
            {this.videoMessage}
            <vime-player controls
              onVPlayingChange={this.onPlayingChange.bind(this)}
              onVPausedChange={this.onPausedChange.bind(this)}
              ref={(el) => { this.player = el }}
            >
              <vime-youtube videoId="DyTCOwB0DVw" />
            </vime-player>
          </div>
      </Host>
    )
  }

}
