//const xtn_laptop = 'egphknkmnjfgopfbahecbemahbphomeg'
//const extensionId_LocalTesting = 'dnokejphlpljkikgfgmaiojlohadfdgo'
//const extensionId_InStore = 'ggdmhmaklbcaeeolnppfehjkkihhnkfe'
//const API = chrome
//const available_xtn = [xtn_laptop,extensionId_LocalTesting,extensionId_InStore, extensionId_Ted]
//let selected_xtn = xtn_laptop
let sessionId = ''
// betterMethod when working for firefox
const betterMethod = true

// this should log to contentscript
function sendMessageExtension (payload) {
    window.postMessage({
        direction: "browser-to-extension",
        message: payload
    }, "*")
}

export async function startMonetization (url, paymail) {
    sessionId = create_UUID()
    const payload = {
        command: "start",
        data:{
            requestId:sessionId,
            paymentPointer:paymail,
            initiatingUrl: url,
            serviceProviderUrl:''
            }
        }
    sendMessageExtension(payload)
}

export async function stopMonetization () {
    const payload = {command: "stop"}
    sendMessageExtension(payload)
}

export async function checkExtension () {
    const isFirefox = typeof InstallTrigger !== 'undefined'
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
    const payload = {command: "info"}
    console.log(payload)
    sendMessageExtension(payload)
}

async function getExchange()  {
    const url = 'https://cash.bitcoinofthings.com/exchange'
    const response = await fetch(url)
    const result = await response.json()
    return result
}

function convertSatoshisToUsd(satoshis, exchange) {
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