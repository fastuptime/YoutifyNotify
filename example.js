const YoutifyNotify = require('youtify-notify');

const myChannel = new YoutifyNotify({
    channelId: 'UCOBPKI0p2_zpJHydUBu99hg',
    discordWebhook: 'https://discord.com/api/webhooks/............../...............',
    interval: 5000,
    message: 'New video: ${title}, ${url} submitted by ${author}'
})

myChannel.on('newVideo', (video) => {
    console.log(`New video: ${video.title}, ${video.url} submitted by ${video.author}`)
})

myChannel.start();