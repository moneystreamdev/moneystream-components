import { Component, Host, h, Prop } from '@stencil/core';


@Component({
  tag: 'moneystream-offer',
  styleUrl: 'moneystream-offer.css',
  shadow: true,
})
export class MoneystreamOffer {
  @Prop() price: string = null
  @Prop() duration: string = null
  @Prop() title: string = ''

  durationdescription() {
    if (!this.duration) return ''
    const dur = this.duration.split(':')
    const hours = Number(dur[0])
    const minutes = Number(dur[1])
    const seconds = Number(dur[2])
    if (hours > 0) return `${hours} hr ${minutes} min`
    if (minutes > 0) return `${minutes} min ${seconds} sec`
    return `${seconds} sec`
  }

  render() {
    return (
      <Host>
        <div class="offer"><span>{this.title}</span> / <span>&#162;</span> <span>{this.price}</span> / <span>{this.durationdescription()}</span></div>
      </Host>
    );
  }

}
