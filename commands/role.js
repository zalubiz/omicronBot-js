const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {

  ROLEn = message.guild.roles.array()

  var ROLES = "";

    ROLEn.forEach(function(element){
        ROLES += element.name + "\n"
    });

    message.channel.send("```" + "\n" +
                         "---------------------------------" + "\n" +
                         "ALL SERVER ROLES" + "\n" +
                         "---------------------------------" + "\n" +
                         `${ROLES}` + "```").then(function (message) {message.react("%F0%9F%97%91")}).catch()

}
