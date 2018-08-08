const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	let djRole = message.guild.roles.find("name", "DJ");
	let adminRole = message.guild.roles.find("name", "admin");
     if (message.member.roles.has(adminRole.id)) {
          if (!args || args.size < 1) return message.reply("Must provide a command name to reload.");

          delete require.cache[require.resolve(`./${args[0]}.js`)];
          message.channel.send(`The command ${args[0]} has been reloaded`).then(function(message) {
               message.react("%F0%9F%97%91")
          }).catch()
     } else {
          message.channel.send('You need admin role to use this command');
     }

}
