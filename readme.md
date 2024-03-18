# YoutifyNotify 📹

YoutifyNotify is a Node.js module that allows you to receive new video notifications from a specific YouTube channel and optionally send them to Discord servers.

## Installation

To use YoutifyNotify, you need to install it via npm:

```bash
npm install youtify-notify
```

## Usage

With YoutifyNotify, you can automatically track new videos from your favorite YouTube channels. Additionally, you can optionally send these notifications to your Discord servers.

```javascript
const YoutifyNotify = require('youtify-notify');

// Creating an instance of YoutifyNotify
const notifier = new YoutifyNotify({
    channelId: 'CHANNEL_ID_HERE',
    discordWebhook: 'DISCORD_WEBHOOK_URL_HERE',
    message: '🎉 New video! **${title}** by ${author}: ${url}'
});

// Listening for the newVideo event
notifier.on('newVideo', (video) => {
    console.log(`🚀 New video: ${video.title}`);
});

// Starting notifications
notifier.start();
```

## Parameters

- **channelId**: The ID of the YouTube channel you want to watch.
- **discordWebhook** (Optional): The webhook URL to send new video notifications to Discord.
- **message** (Optional): The notification message to send to Discord. Variables like `${title}`, `${url}`, and `${author}` can be used.
- **interval** (Optional): The interval between checks for new videos (default: 5000 ms).

## Example

To send new video notifications to your Discord server:

```javascript
const notifier = new YoutifyNotify({
    channelId: 'CHANNEL_ID_HERE',
    discordWebhook: 'DISCORD_WEBHOOK_URL_HERE',
    message: '🎉 New video! **${title}** by ${author}: ${url}'
});

notifier.start();
```

---