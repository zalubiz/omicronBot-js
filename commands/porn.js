const Discord = require ("discord.js");
const randomPuppy = require('random-puppy');

exports.run = (bot, message, args, func) => {


    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setImage(url);
            message.channel.send({
                embed
		 }).then(function (message) {message.react("%F0%9F%97%91")}).catch()
        })
}
