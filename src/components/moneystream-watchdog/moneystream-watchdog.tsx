import { Component, Host, h, State, Method, Prop, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'moneystream-watchdog',
  styleUrl: 'moneystream-watchdog.css',
  shadow: true,
})
// monitors monetization to make sure content policies are followed
export class MoneystreamWatchdog {
  // number of seconds, cannot be too small!
  @Prop() interval: number = 9
  // number of times interval is triggered
  @State() counter: number = 0
  // status = 'stopped|running'
  @State() timerstatus: string = 'stopped'
  @State() monetizationstatus: string = 'stopped'
  timer = null
  // when watchdog timer was started
  lastStarted = null
  // last time a progress event was received
  lastProgress = null

  @Method() async start() { 
    this.startTimer() 
  }
  @Method() async stop() { this.stopTimer() }

  @Event() monetizationWatchdog: EventEmitter<string>
  monetizationChangedEmit(status: string) {
    this.lastStarted = null
    this.lastProgress = null
    this.timer = null
    this.counter = 0
    this.monetizationWatchdog.emit(status)
  }

  startTimer () {
    this.timer = setInterval(()=>{
      // check if monetization message has been received
      // within this.interval seconds
      if (this.lastProgress || this.lastStarted) {
        const millisecelapsed = Date.now() - (this.lastProgress || this.lastStarted)
        console.log(`watchdog`, millisecelapsed)
        if (millisecelapsed > this.interval*1000) {
          this.monetizationstatus = 'timeout'
          this.monetizationChangedEmit(this.monetizationstatus)
          this.stopTimer()
        }
      }
      this.counter += 1
    }, 1000)
    this.timerstatus = 'running'
    this.lastStarted = Date.now()
  }

  stopTimer() {
    if (this.timer) { clearInterval(this.timer) }
    this.timerstatus = 'stopped'
  }

  @Listen('message', { target: 'window' })
  messageHandler(event) {
    console.log(event)
    if (event.data.type == "monetizationstart") {
      this.lastStarted = Date.now()
      this.monetizationstatus = 'pending'
      this.monetizationChangedEmit(this.monetizationstatus)
    }
    if (event.data.type == "monetizationprogress") {
      this.lastProgress = Date.now()
      // this.logMessage(event.data)
      // this.monetizationamount += parseInt(event.data.detail.amount,10)
      // this.updateAmount()
      // if (this.monetizationamount > 400) {
      //     this.monetizationstatus = 'monetized'
      // } else {
      //     this.monetizationstatus = 'pending'
      // }
      // this.monetizationProgressEmit({
      //   status: this.monetizationstatus,
      //   amount: this.monetizationamount
      // })
      const lastStatus = this.monetizationstatus
      this.monetizationstatus = 'monetized'
      if (this.monetizationstatus !== lastStatus) {
        this.monetizationChangedEmit(this.monetizationstatus)
      }
    }
    if (event.data.type == "monetizationstop") {
      // this.logMessage(event.data)
      this.monetizationstatus = 'stop'
      this.monetizationChangedEmit(this.monetizationstatus)
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
