const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (bot, message, args) => {
    let user = message.mentions.users.first();
    let member;
    if (!user) member = message.author
    if (user) member = user
    if (member.bot) return message.channel.send("Im sorry, but bots do not have levels.")
    db.fetchObject(`userLevel_${member.id}`).then(l => {
        db.fetchObject(`messages_${member.id}`).then(m => {
            var embed = new Discord.RichEmbed()
            .setTitle(`${member.username}'s Level`)
            .setColor("BLUE")
            .setTimestamp()
            .setThumbnail(member.displayAvatarURL)
            .addField(":signal_strength: Level :signal_strength:", `**__Level ${l.value}__**`)
            .addField(":speech_balloon: Messages Sent :speech_balloon:", `**__${m.value} messages__**`)
            message.channel.send({ embed: embed })
        });
    });
}

exports.help = {
    name: "level",
    description: "Gets the level of you or another user",
    usage: ">level <user mention>"
}

exports.aliases = ["lvl"]