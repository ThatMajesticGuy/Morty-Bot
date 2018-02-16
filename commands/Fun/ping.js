const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    message.channel.send("Pinging... sec").then(msg => {
        var embed = new Discord.RichEmbed()
        .setTitle("Pong! :ping_pong:")
        .setColor("BLUE")
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter("Made by ThatMajesticGuy#7530", bot.users.get("262410813254402048").avatarURL)
        .addField("Latency Ping", msg.createdTimestamp - message.createdTimestamp)
        .addField("API Ping", Math.round(bot.ping))
        msg.edit({ embed: embed })
    })
}

exports.help = {
    name: "ping",
    description: "Gets your ping!",
    usage: ">ping"
}

exports.aliases = []