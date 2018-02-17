const Discord = require('discord.js');

exports.run = (bot, message, args) => {
  const prefix = ">";
  const cmd = message.content.split(" ").slice(1).join(" ")
  if (!cmd) {
    var embed = new Discord.RichEmbed()
    .setTitle("Commands")
    .setColor("BLUE")
    .setTimestamp()
    .setThumbnail("https://image.flaticon.com/icons/png/512/262/262825.png")
    .setFooter(`Ran by ${message.author.username}`, message.author.displayAvatarURL)
    .addField(":large_blue_circle: Fun", `\u200b`)
    .addField(":large_blue_circle: Utility", `\u200b`)
    .addField(":large_blue_circle: Economy", `\u200b`)
    message.channel.send({ embed: embed })
  }
  if (cmd.toLowerCase().includes("fun") || cmd.toLowerCase().includes("utility") || cmd.toLowerCase().includes("economy") || cmd.toLowerCase().includes("music")) {
    function convert_case(str) {
  var lower = str.toLowerCase();
  return lower.replace(/(^| )(\w)/g, function(x) {
    return x.toUpperCase();
  });
}



var cmdlist = new Discord.RichEmbed()
.setTitle(`Commands on ${convert_case(cmd)}`)
.setColor("BLUE")
.setThumbnail(message.author.displayAvatarURL)

require('fs').readdir(`commands/${convert_case(cmd)}`, function(err, files){
               if(err) console.log(err);

               let jsfile = files.filter(f => f.split('.').pop() == 'js');
               if(jsfile.length<=0){
                   message.channel.send("That is not a valid Section!")
               }

               jsfile.forEach(function(f, i){
                   let props = require(`../${convert_case(cmd)}/${f}`);
                   cmdlist.addField(`:large_blue_circle: ${prefix}${props.help.name}`, `**${props.help.description}**\n\u200b`)
               });
               return message.channel.send({ embed: cmdlist })
  })


} else {
  let command = cmd;
let aliases;
if (bot.commands.has(command)) {
    command = bot.commands.get(command);
  }
  if (command.aliases.length === 0) aliases = "None";
if (command.aliases.length > 0) aliases = command.aliases
  var embed = new Discord.RichEmbed()
  .setTitle(`Info on ${command.help.name}`)
  .setColor("BLUE")
  .setThumbnail(message.author.displayAvatarURL)
  .setTimestamp()
  .addField(":scroll: Description :scroll:", `**__${command.help.description}__**`)
  .addField(":tools: Usage :tools:", `**__${command.help.usage}__**`)
  .addField(":neutral_face: :neutral_face: Aliases :neutral_face: :neutral_face:", `**__${aliases}__**`)
  message.channel.send({ embed: embed })
}
};

exports.help = {
  name: "help",
  description: "Lists all the available commands!",
  usage: ">help <command name or command section>"
}

exports.aliases = ["cmds", "commands"]
