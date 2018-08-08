
exports.run = (bot, message, args, func) => {
	let djRole = message.guild.roles.find("name", "DJ");
	let adminRole = message.guild.roles.find("name", "admin");
     if (message.member.roles.has(adminRole.id)) {
          var member = message.mentions.members.first();
          member.ban().then((member) => {
               message.channel.send(":point_left: " + member.displayName + " has been successfully banned :point_right: ")
          }).catch(() => {
               message.channel.send("Access Denied");
          })

     } else {
          message.channel.send('You need admin role to use this command');
     }

}
