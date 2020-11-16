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
  // monetizationstrategy = "required|none"
  @Prop() monetizationstrategy: string = 'required'
  // moneystreamdisplay = "show|hide|hidden"
  @Prop() moneystreamdisplay: string = 'show'
  @Prop() mediaTitle: string = ''
  @Prop() mediaType: string = 'audio/mp3'
  @State() moneystream: any
  @State() player: any

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
      if (this.monetizationstrategy === 'required') {
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

  pausePlayer() {
    this.player.pause()
  }

  render() {
    return (
      <Host>
        <div class="colvids">
        <div class={this.moneystreamdisplay === 'hide' || this.moneystreamdisplay === 'hidden' ? 'hidden':'right'}>
              <moneystream-dash id="moneystream"
              payto = {this.payto}
              ref={(el) => { this.moneystream = el }}
              ></moneystream-dash>
            </div>
            <div>{this.mediaTitle}</div>
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
