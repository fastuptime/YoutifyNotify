# YoutifyNotify 📹

YoutifyNotify, belirli bir YouTube kanalının yeni video bildirimlerini almanızı ve isteğe bağlı olarak Discord sunucularına göndermenizi sağlayan bir Node.js modülüdür.

## Kurulum

YoutifyNotify'ı kullanmak için öncelikle npm üzerinden yüklemeniz gerekir:

```bash
npm install youtify-notify
```

## Kullanım

YoutifyNotify'ı kullanarak, favori YouTube kanallarınızın yeni videolarını otomatik olarak takip edebilirsiniz. Ayrıca, isteğe bağlı olarak bu bildirimleri Discord sunucularınıza gönderebilirsiniz.

```javascript
const YoutifyNotify = require('youtify-notify');

// YoutifyNotify örneği oluşturma
const notifier = new YoutifyNotify({
    channelId: 'CHANNEL_ID_HERE',
    discordWebhook: 'DISCORD_WEBHOOK_URL_HERE',
    message: '🎉 Yeni video! **${title}** by ${author}: ${url}'
});

// Yeni video olayını dinleme
notifier.on('newVideo', (video) => {
    console.log(`🚀 Yeni video: ${video.title}`);
});

// Bildirimleri başlatma
notifier.start();
```

## Parametreler

- **channelId**: İzlemek istediğiniz YouTube kanalının ID'si.
- **discordWebhook** (Opsiyonel): Yeni video bildirimlerini Discord'a göndermek için kullanılacak webhook URL'si.
- **message** (Opsiyonel): Discord'a gönderilecek bildirim mesajı. `${title}`, `${url}`, ve `${author}` gibi değişkenler kullanılabilir.
- **interval** (Opsiyonel): Yeni video kontrolü arasındaki süre (varsayılan: 5000 ms).

## Örnek

Yeni video bildirimlerini Discord sunucunuza göndermek için:

```javascript
const notifier = new YoutifyNotify({
    channelId: 'CHANNEL_ID_HERE',
    discordWebhook: 'DISCORD_WEBHOOK_URL_HERE',
    message: '🎉 Yeni video! **${title}** by ${author}: ${url}'
});

notifier.start();
```

---