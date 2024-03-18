const request = require('request-promise');
const EventEmitter = require('events');
const { StarDB } = require('stardb');

class YoutifyNotify extends EventEmitter {
    constructor(options) {
        super();
        this.channelId = options.channelId;
        this.discordWebhook = options.discordWebhook;
        if(!this.channelId) throw new Error('Missing channelId');
        if(this.discordWebhook) {
            if(!this.discordWebhook.startsWith('https://discord.com/api/webhooks/')) {
                throw new Error('Invalid discord webhook');
            } else if(!options.message) {
                throw new Error('Missing message');
            }
        }
        this.message = options.message;
        this.interval = options.interval || 5000;
        this.db = new StarDB('youtify-notify.json');
    }

    async start() {
        setInterval(async () => {
            const video = await this.getLatestVideo();
            if (video.url !== await this.db.get(`c_${this.channelId}`)) {
                await this.db.set(`c_${this.channelId}`, video.url);
                this.emit('newVideo', video);
                this.sendToDiscord(video);
            }
        }, this.interval);
    }

    async getLatestVideo() {
        const response = await request(`https://www.youtube.com/feeds/videos.xml?channel_id=${this.channelId}`);
        const video = {
            title: response.match(/<title>(.*?)<\/title>/)[1],
            url: response.match(/<uri>(.*?)<\/uri>/)[1],
            author: response.match(/<name>(.*?)<\/name>/)[1]
        }

        return video;
    }

    async sendToDiscord(video) {
        await request.post(this.discordWebhook, {
            json: {
                content: this.message.replace('${title}', video.title).replace('${url}', video.url).replace('${author}', video.author)
            }
        })
    }

}

module.exports = YoutifyNotify;