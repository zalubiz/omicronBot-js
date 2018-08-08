const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
	let djRole = message.guild.roles.find("name", "DJ");
	let adminRole = message.guild.roles.find("name", "admin");
     if (message.member.roles.has(adminRole.id)) {
          //!tempmute @user 1s/m/h/d

          let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if (!tomute) return message.reply("Couldn't find user.");
          let muterole = message.guild.roles.find(`name`, "muted");
          //start of create role
          if (!muterole) {
               try {
                    muterole = await message.guild.createRole({
                         name: "muted",
                         color: "#000000",
                         permissions: []
                    })

                    message.guild.channels.forEach(async (channel, id) => {
                         await channel.overwritePermissions(muterole, {
                              SEND_MESSAGES: false,
                              ADD_REACTIONS: false,
                              SPEAK: false,
                              MOVE_MEMBERS: false,
                              USE_VAD: false
                         });
                    });

               } catch (e) {
                    console.log(e.stack);
               }
          }
          //end of create role
          let mutetime = args[1];
          console.log(args);
          console.log(args[0])
          console.log(mutetime);
          if (!mutetime) return message.reply("You didn't specify a time!");

          await (tomute.addRole(muterole.id));
          message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

          setTimeout(function() {
               tomute.removeRole(muterole.id);
               message.channel.send(`<@${tomute.id}> has been unmuted!`).then(function(message) {
                    message.react("%F0%9F%97%91")
               }).catch()
          }, ms(mutetime));


     } else {
          message.channel.send('You need admin role to use this command');
     }

}
