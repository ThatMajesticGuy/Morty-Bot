const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (bot, message, args) => {
  let user = message.mentions.users.first();
  let member;
  if (!user) member = message.author
  if (user) member = user
  if (member.bot) return message.channel.send("Im sorry, but bots do not have accounts.")
  db.fetchObject(`bank_${member.id}`).then(money => {
    var embed = new Discord.RichEmbed()
    .setDescription(`Bank account for **${member.username}**`)
    .setColor("#6b93d6")
    .setThumbnail(member.displayAvatarURL)
    .setTimestamp()
    .setFooter(`Ran by ${message.author.username}`, message.author.displayAvatarURL)
    .addField(":dollar: Money :dollar:", `**__${money.value}__**`)
    .addField(":credit_card: Credit Card Number :credit_card:", `**__${money.text}__**`)
    message.channel.send({ embed: embed })
  })
}

exports.help = {
  name: "bank",
  description: "Gets your bank account!",
  usage: ">bank <user>"
}

exports.aliases = ["bal"]
