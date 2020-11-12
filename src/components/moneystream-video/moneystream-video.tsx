import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'moneystream-video',
  styleUrl: 'moneystream-video.css',
  shadow: true,
})
export class MoneystreamVideo {
  @State() player: any = null
  @State() videoMessage: string = ''

  //@Listen('load', { target: 'window' })
  // @Listen('DOMContentLoaded', { target: 'document' })
  // readyHandler(event) {
  //   this.videoMessage = `load window: COMPONENT READY`
  //   this.makePlayer()
  //   this.playVideo()
  // }

  componentWillLoad() {
    this.makePlayer();
  }

  // @Method()
  // async whenLoaded() {
  //   console.log(`whenloaded`)
  //   this.makePlayer()
  //   this.playVideo()
  // }

  // connectedCallback() {
  //   console.log(`will load`)
  //   // document.addEventListener('DOMContentLoaded', () => {
  //   //   console.log(`loaded`)
  //     this.makePlayer()
  //     this.playVideo()
  //   // })
  // }

makePlayer() {
    //this.player.on('statechange', onPlayerStateChange)
    // this.player.poster = 'https://images.unsplash.com/photo-1533069027836-fa937181a8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    // console.log(this.player)
    //this.videoMessage = `Player ready`
  }

  playVideo() {
    console.log(this.player)
    this.player.play()
  }

  render() {
    return (
      <Host>
        <moneystream-dash></moneystream-dash>
          <div class="colvids">
            {this.videoMessage}
            <vime-player controls>
        <vime-video crossOrigin="" poster="https://media.vimejs.com/poster.png">
          {/* These are passed directly to the underlying HTML5 `<video>` element. */}
          {/* Why `data-src`? Lazy loading, you can always use `src` if you prefer.  */}
          <source 
            data-src="https://media.vimejs.com/720p.mp4" 
            type="video/mp4" 
          />
          <track 
            default 
            kind="subtitles" 
            src="https://media.vimejs.com/subs/english.vtt" 
            srclang="en" 
            label="English" 
          />
        </vime-video> 
      </vime-player>
          </div>
      </Host>
    )
  }

}
