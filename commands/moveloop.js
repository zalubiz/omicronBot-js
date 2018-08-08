const Discord = require('discord.js');
const delay = require('delay');

exports.run = async (bot, message, args, func) => {
	let djRole = message.guild.roles.find("name", "DJ");
	let adminRole = message.guild.roles.find("name", "admin");
     if (message.member.roles.has(adminRole.id)) {
          var member = message.mentions.members.first();
          const channel = member.voiceChannelID;
          var i = 0;
          var x = 5 * args[1];

          message.delete();
          while (i < x) {
               await delay(1000);
               member.setVoiceChannel('474645165861109761');
               member.setVoiceChannel('474645125910233108');
               i += 1;
          }
          if (i >= x) {
               //console.log("=");
               member.setVoiceChannel(channel);
          }

     } else {
          message.channel.send('You need admin role to use this command');
     }
}
