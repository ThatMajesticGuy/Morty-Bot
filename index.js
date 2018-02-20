const Discord = require('discord.js');
const bot = new Discord.Client();
const chalk = require('chalk');
const db = require('quick.db');
const random = require('random-integer');
const cooldown = new Set();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

require('fs').readdir("./commands/Utility", (err, files) => {
    if(err) console.error((err));
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Do you mind making the commands first?".red);
        return;
    }


    console.log(chalk.red(`\n\nLoading ${jsfiles.length} Utility commands!`));

    jsfiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/Utility/${f}`)]
        let props = require(`./commands/Utility/${f}`)
        console.log(chalk.magenta(`${i + 1}: ${f} loaded!`));
        bot.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
    });

    });
 });

 require('fs').readdir("./commands/Fun", (err, files) => {
     if(err) console.error((err));
     let jsfiles = files.filter(f => f.split(".").pop() === "js");
     if(jsfiles.length <= 0) {
         console.log("Do you mind making the commands first?".red);
         return;
     }


     console.log(chalk.gray(`\n\nLoading ${jsfiles.length} Fun commands!`));

     jsfiles.forEach((f, i) => {
         delete require.cache[require.resolve(`./commands/Fun/${f}`)]
         let props = require(`./commands/Fun/${f}`)
         console.log(chalk.cyan(`${i + 1}: ${f} loaded!`));
         bot.commands.set(props.help.name, props);
         props.aliases.forEach(alias => {
         bot.aliases.set(alias, props.help.name);
     });

     });
  });

require('fs').readdir("./commands/Music", (err, files) => {
        if(err) console.error((err));
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0) {
            console.log("Do you mind making the commands first?".red);
            return;
        }


        console.log(chalk.green(`\n\nLoading ${jsfiles.length} Music commands!`));

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./commands/Music/${f}`)]
            let props = require(`./commands/Music/${f}`)
            console.log(chalk.magenta(`${i + 1}: ${f} loaded!`));
            bot.commands.set(props.help.name, props);
            props.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });

        });
     });

  require('fs').readdir("./commands/Economy", (err, files) => {
      if(err) console.error((err));
      let jsfiles = files.filter(f => f.split(".").pop() === "js");
      if(jsfiles.length <= 0) {
          console.log("Do you mind making the commands first?".red);
          return;
      }


      console.log(chalk.green(`\n\nLoading ${jsfiles.length} Economy commands!`));

      jsfiles.forEach((f, i) => {
          delete require.cache[require.resolve(`./commands/Economy/${f}`)]
          let props = require(`./commands/Economy/${f}`)
          console.log(chalk.gray(`${i + 1}: ${f} loaded!`));
          bot.commands.set(props.help.name, props);
          props.aliases.forEach(alias => {
          bot.aliases.set(alias, props.help.name);
      });

      });
   });

   require('fs').readdir("./commands/Administrator", (err, files) => {
       if(err) console.error((err));
       let jsfiles = files.filter(f => f.split(".").pop() === "js");
       if(jsfiles.length <= 0) {
           console.log("Do you mind making the commands first?");
           return;
       }


       console.log(chalk.blue(`\n\nLoading ${jsfiles.length} Administrator commands!`));

       jsfiles.forEach((f, i) => {
           delete require.cache[require.resolve(`./commands/Administrator/${f}`)]
           let props = require(`./commands/Administrator/${f}`)
           console.log(chalk.red(`${i + 1}: ${f} loaded!`));
           bot.commands.set(props.help.name, props);
           props.aliases.forEach(alias => {
           bot.aliases.set(alias, props.help.name);
       });

       });
    });


bot.on("message", async message => {
    if(message.author.bot) return;
    
     if(message.channel.type === "dm") {
         message.channel.send("Silly! Commands don't work here!")
         return;
    }
    
    const prefix = ">";
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    if(!command.startsWith(prefix)) return;
    
    if (bot.aliases.has(command.slice(prefix.length).toLowerCase())) {
        bot.commands.get(bot.aliases.get(command.slice(prefix.length).toLowerCase())).run(bot, message, args)
    }
        if (bot.commands.has(command.slice(prefix.length).toLowerCase())) {
         bot.commands.get(command.slice(prefix.length).toLowerCase()).run(bot, message, args)
        }

});

bot.on("ready", ready => {
    console.log(chalk.green("-------------------"))
    console.log(chalk.blue(`Logged in as ${bot.user.tag}`))
    console.log(chalk.blue(`${bot.users.size} people!`))
    console.log(chalk.blue("Ready to Start!"))
    console.log(chalk.green("-------------------"))
    bot.user.setActivity("with Morty Fans | Prefix is >")
    bot.user.setAvatar("https://cdn.discordapp.com/attachments/413828401758208018/415638903907811338/JPEG_20180218_194805.jpg")
    bot.user.setUsername("ChillUnity")
});

bot.on('message', message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
db.fetchObject(`bank_${message.author.id}`).then(i => {
    if (!i.text) db.updateText(`bank_${message.author.id}`, `${random(1000, 10000)} - ${random(1000, 10000)} - ${random(1000, 10000)} - ${random(1000, 10000)}`)
    if (!i.value) db.updateValue(`bank_${message.author.id}`, 500)
})
})

bot.on('message', message => {
        if (message.author.bot) return;
            if (message.channel.type == 'dm') return;
    
            if (cooldown.has(message.author.id))
            return;
          
          // Adds the user to the set so that they can't talk for 2.5 seconds
          cooldown.add(message.author.id);
          setTimeout(() => {
            // Removes the user from the set after 2.5 seconds
            cooldown.delete(message.author.id);
          }, 10000);

        db.updateValue(`messages_${message.author.id}`, 1).then (p => {
    
            db.fetchObject(`messages_${message.author.id}`).then(i => {
    
                let messages;
                if (i.value == 25) messages = 25; // Level 1
                else if (i.value == 50) messages = 50; // Level 2
                else if (i.value == 75) messages = 75; // Level 3
                else if (i.value == 100) messages = 100; // Level 4
                else if (i.value == 250) {
                 messages = 250;
                 message.member.addRole(message.guild.roles.get("name", "Morty's Children").id) // Level 5
                }
                else if (i.value == 500) messages = 500; // Level 6
                else if (i.value == 1000) messages = 1000; // Level 7
                else if (i.value == 2500) messages = 2500; // Level 8
                else if (i.value == 5000) messages = 5000; // Level 9
                else if (i.value == 10000) {
                message.member.addRole(message.guild.roles.get("name", "GayLord").id)
                 messages = 10000; // Level 10
                }
                else if (i.value == 15000) messages = 15000; // Level 11
                else if (i.value == 20000) messages = 20000; // Level 12
                else if (i.value == 25000) messages = 25000; // Level 13
                else if (i.value == 30000) messages = 30000; // Level 14
                else if (i.value == 40000) messages = 40000; // Level 15
                else if (i.value == 45000) messages = 45000; // Level 16
                else if (i.value == 50000) messages = 50000; // Level 17
                else if (i.value == 60000) messages = 60000; // Level 18
                else if (i.value == 70000) messages = 70000; // Level 19
                else if (i.value == 80000) messages = 80000; // Level 20
    
                if (!isNaN(messages)) {
    
                    db.updateValue(`userLevel_${message.author.id}`, 1).then(o => {
                        var embed = new Discord.RichEmbed()
                        .setTitle("Level Up!")
                        .setThumbnail("http://carolinafarmstewards.org/wp-content/uploads/2016/01/Level-Up-Logo-1024x1024.png")
                        .setAuthor("Leveled Up!", message.author.displayAvatarURL)
                        .setTimestamp()
                        .setColor("RANDOM")
                        .addField(`${message.author.username}, you have sent ***__${messages}__*** messages`, `You have leveled up! You are now level ${o.value}, keep climbing up the ranks!`)
                        message.channel.send({ embed: embed })
    });
                }
            });
    });
    });

    bot.on('guildMemberAdd', member => {
      bot.channels.get("414847163156398080").send(`Welcome **${member.user.username}** to **${member.guild.name}**! Hope you have a great time! <:Morty_owo:414206376215052299>\n\nWe now have **${member.guild.members.size}** users!\n\n`)
      member.addRole("412380636922249216")
    });

    bot.on('guildMemberRemove', member => {
      bot.channels.get("414847163156398080").send(`**${member.user.username}** has left **${member.guild.name}**! :cry:\n\nWe now have **${member.guild.members.size}** users!\n\n`)
    });

bot.login(process.env.BOT_TOKEN)
