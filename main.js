const { Client, Intents } = require('discord.js');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});

const sunucuID = '1161769848964128832'; // Ayarladığınız sunucunun ID'sini girin
const davetKodu = 'discord.gg/1743'; // Özel davet bağlantısının kodunu girin
const girisCikisLimiti = 10; // Gir-çık limitini belirtin
const girisCikisAraligi = 10 * 1000; // Gir-çık aralığı (milisaniye cinsinden)

let girisCikisSayisi = 0;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Zamanlayıcıyı başlat
    setInterval(() => {
        const sunucu = client.guilds.cache.get(sunucuID);
        if (sunucu) {
            sunucu.join()
                .then(() => {
                    girisCikisSayisi++;
                    console.log(`Giriş-çıkış ${girisCikisSayisi} kez yapıldı.`);
                    if (girisCikisSayisi >= girisCikisLimiti) {
                        console.log(`Giriş-çıkış limitine ulaşıldı, işlem sonlandırıldı.`);
                        clearInterval(interval);
                    }
                })
                .catch(console.error);
        } else {
            console.log(`Sunucu bulunamadı.`);
        }
    }, girisCikisAraligi);
});

client.on('message', message => {
    if (message.content.includes(davetKodu)) {
        message.guild.leave()
            .then(() => console.log(`Sunucudan ayrıldı: ${message.guild.name}`))
            .catch(console.error);
    }
});

client.login('');
