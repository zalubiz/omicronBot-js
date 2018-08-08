const Discord = require("discord.js");

exports.run = (bot, message, args, func) => {
	let djRole = message.guild.roles.find("name", "DJ");
	let adminRole = message.guild.roles.find("name", "admin");
     if (message.member.roles.has(adminRole.id)) {

          let replyArgs = message.content.slice(1 + 2).split(",");
          const user = args[0];
          const msg = args.slice(1).join(" ");
          //	  console.log(user);
          bot.users.get(user).send({
               embed: {
                    description: `**${msg}**`,
                    color: 0x36393e,
                    author: {
                         name: message.author.tag,
                         icon_url: message.author.avatarURL
                    }
               }
          })
          message.channel.send({
               embed: {
                    title: `**message send to **`,
                    color: 0x36393e,
                    author: {
                         name: bot.user.username,
                         icon_url: bot.user.avatarURL
                    },
                    footer: {
                         text: user
                    }

               }
          }).then(function(message) {
               message.react("%F0%9F%97%91")
          }).catch()
          return;

     } else {
          message.channel.send('You need admin role to use this command');
     }

}
