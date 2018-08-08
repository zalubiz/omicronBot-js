const Discord = require('discord.js');

exports.run = (bot, message, args, func) => {
     let adminRole = message.guild.roles.find("name", "admin");
     if (message.member.roles.has(adminRole.id)) {
		message.delete();
          console.clear();
          bot.destroy()
          bot.login('MzY1ODgyOTMxNzkwNjEwNDMy.DiU_sw.V-an8nOx7K6IjjINA8xW7oOt5Ts');
          message.channel.send("Restarted").then(function(message) {
               message.react("%F0%9F%97%91")
          }).catch()

     } else {
          message.channel.send('You need admin role to use this command');
     }
}
