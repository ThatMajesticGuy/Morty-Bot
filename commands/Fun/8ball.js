const Discord = require('discord.js');

exports.run = (bot, message, args) => {

var didNotEndWithQuestionmark =
    [
      "You did not end it with a question mark, so therefore, it is NOT a question"
    ]

var endedWithQuestionmark =
    [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, Yes",
        "Most likely",
        "Outlook seems good",
        "Yeah whatever keeps you smiling",
        "Signs are pointing to yes",
        "Reply is hazy, try again",
        "Ask me again later",
        "It's better not to tell you now",
        "I cannot predict right now",
        "Concentrate and ask me again",
        "Don't count on it",
        "Don't put your hopes on it",
        "My reply is No",
        "My sources are telling me no",
        "Outlook doesn't seem so good",
        "It's very doubtful"
    ]

exports.run = async (bot, message) => {
    const args = message.content.split(" ").slice(1).join(" ");
    if (!args) {
        const embed5 = new Discord.RichEmbed()
        .setDescription(`Do you really expect me to reply to **NOTHING**?`)
        .setColor("#6b93d6")
        message.channel.send({embed: embed5})
        return;
    }

    const embed = new Discord.RichEmbed()
    .setDescription(`:8ball: **||** ${endedWithQuestionmark[Math.floor(Math.random() * endedWithQuestionmark.length)]}`)
    .setColor("#6b93d6")

    if (!message.content.endsWith("?")) {
        const embed2 = new Discord.RichEmbed()
        .setDescription(`:8ball: **||** ${didNotEndWithQuestionmark[Math.floor(Math.random() * didNotEndWithQuestionmark.length)]}`)
        .setColor("#6b93d6")
        message.channel.send({embed: embed2})
        return;
    }

    if (message.content.endsWith("?")) {
        const embed = new Discord.RichEmbed()
        .setDescription(`:8ball: **||** ${endedWithQuestionmark[Math.floor(Math.random() * endedWithQuestionmark.length)]}`)
        .setColor("#6b93d6")
        message.channel.send({embed: embed})
    }

}}


exports.help = {
    name: "8ball",
    description: "Sends a random response to your question!",
    usage: ">8ball <question>"
}

exports.aliases = ["8"]
