const Discord = require("discord.js");
exports.run = (bot, message, args, func) => {


let replies = ["1", "2", "3", "4", "5", "6", "Error Occured"];

let result = Math.floor((Math.random() * replies.length));

let ballembed = new Discord.RichEmbed()
.setColor("#000000")
.addField("Answer", replies[result]);

message.channel.send(ballembed).then(function (message) {message.react("%F0%9F%97%91")}).catch()
}
