exports.run = (bot, message, args, func) => {

message.channel.send(`Result: **${Math.floor(Math.random() * 2) == 0 ? "heads" : "tails"}**!`).then(function (message) {message.react("%F0%9F%97%91")}).catch()

}
