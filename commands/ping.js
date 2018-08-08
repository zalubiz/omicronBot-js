const Discord = require("discord.js");

	module.exports.run = async (bot, message, args) => {
		const m = await message.channel.send("🔔 Pong");

		let Embed = new Discord.RichEmbed()
		.addField("📶 Latency", `${m.createdTimestamp - message.createdTimestamp}ms`)
		.addField("💻 API Latency", `${Math.round(bot.ping)}ms`)


	message.channel.send(Embed).then(function (message) {message.react("%F0%9F%97%91")}).catch()

  }
