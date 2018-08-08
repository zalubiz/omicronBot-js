
const hastebin = require('hastebin-gen');
const Discord = require('discord.js')

exports.run = (bot, message, args) => {
	message.delete();
  hastebin(args.join(' '), "js").then(r => {
      var hastLink = r
      const hastEmb = new Discord.RichEmbed()
      .setColor(0xFFF000)

      .setURL(hastLink)
      .addField('Link: ', `${hastLink}`)
       message.channel.send({embed: hastEmb}).then(function (message) {message.react("%F0%9F%97%91")}).catch()
  }).catch(console.error);
}
