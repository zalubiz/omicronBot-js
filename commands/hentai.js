const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot, message, args) => {

    let {body} = await superagent
    .get(`https://nekos.life/api/v2/img/Random_hentai_gif`);
    if (!message.channel.nsfw) return message.reply(" You must be in a N.S.F.W channel to use this command.");

    let hentaiEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setImage(body.url)
    .setColor("RANDOM")

    message.channel.send(hentaiEmbed).then(function (message) {message.react("%F0%9F%97%91")}).catch()

}
