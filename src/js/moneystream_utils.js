let sessionId = ''

// this should log to contentscript
function sendMessageExtension (payload) {
    window.postMessage({
        direction: "browser-to-extension",
        message: payload
    }, "*")
}

export async function sendCommand(command, data) {
    const payload = {
      command: command,
      data: data
    }
    console.log(payload)
    sendMessageExtension(payload)
  }

export async function startMonetization (url, paymail) {
    sessionId = create_UUID()
    sendCommand("start",{
        requestId:sessionId,
        paymentPointer:paymail,
        initiatingUrl: url,
        serviceProviderUrl:''
        })
}

export async function stopMonetization () {
    sendCommand("stop")
}

export async function checkExtension () {
    sendCommand("info")
}

export async function getExchange()  {
    const url = 'https://cash.bitcoinofthings.com/exchange'
    const response = await fetch(url)
    const result = await response.json()
    return result
}

export function convertSatoshisToUsd(satoshis, exchange) {
    if (!exchange) return satoshis
    if (!satoshis) return 0
    const dollarsPerBitcoin = exchange.data.rate
    const dollarsPerSatoshi = dollarsPerBitcoin/1e8
    //const centsPerSatoshi = dollarsPerSatoshi*100
    //console.log(centsPerSatoshi)
    //const cents = centsPerSatoshi * satoshis
    const dollars = dollarsPerSatoshi * satoshis
    return dollars
}

export function create_UUID () {
    var dt = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0
        dt = Math.floor(dt/16)
        return (c=='x' ? r :(r&0x3|0x8)).toString(16)
    })
    return uuid
  }