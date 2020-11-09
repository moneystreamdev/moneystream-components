import { Component, Host, h, State, Listen } from '@stencil/core';
import Plyr from "plyr/dist/plyr.polyfilled"

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
    this.player = new Plyr('#moneystream-player', {
      autoplay:false,
      ratio:'16:9',
      youtube: {noCookie:true},
      // clickToPlay: false
    })
    //this.player.on('statechange', onPlayerStateChange)
    this.player.poster = 'https://images.unsplash.com/photo-1533069027836-fa937181a8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    console.log(this.player)
    this.videoMessage = `Player ready`
  }

  playVideo() {
    console.log(this.player)
    this.player.play()
  }

  render() {
    return (
      // <Host>
          <div class="colvids">
            {this.videoMessage}
            <div id="moneystream-player" 
              data-plyr-provider="youtube" 
              data-plyr-embed-id="qB6I9Zk-7zY"
            ></div>
          </div>
      // </Host>
    )
  }

}
