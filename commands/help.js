const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
module.exports.run = async (bot, message) => {
const commands = JSON.parse(fs.readFileSync('storage/commands.json', 'utf8'));
const prefix = ',';

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);


        if (msg === `${prefix}HELP`) {

		   let groups = '';

		   for (var cmd in commands) {
		       if (!groups.includes(commands[cmd].group)) {
		   	   groups += `${commands[cmd].group}\n`
		       }
		   }

		   message.channel.send({embed: {
		       description:`**${groups}**`,
		       title:"Groups",
		       color: 0x1D82B6
		   }})

		   return;


            message.channel.send({embed}).then(function (message) {message.react("%F0%9F%97%91")}).catch()


        } else {



            let groupFound = '';

            for (var cmd in commands) {

                if (args.join(" ").trim().toUpperCase() === commands[cmd].group.toUpperCase()) {
                    groupFound = commands[cmd].group.toUpperCase();
                    break;
                }

            }

            if (groupFound != '') {


                const embed = new Discord.RichEmbed()
                    .setColor(0x1D82B6)

                let commandsFound = 0;

                for (var cmd in commands) {
                    if (commands[cmd].group.toUpperCase() === groupFound) {
                        commandsFound++
                        embed.addField(`__${commands[cmd].name}__`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix + commands[cmd].usage}`);
                    }

                }


                embed.setFooter(`Currently showing ${groupFound} commands. To view another group do ${prefix}help [group / command]`)
                embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`)

                   message.channel.send({embed}).then(function (message) {message.react("%F0%9F%97%91")}).catch



                return;
            }




            let commandFound = '';
            let commandDesc = '';
            let commandUsage = '';
            let commandGroup = '';

            for (var cmd in commands) {

                if (args.join(" ").trim().toUpperCase() === commands[cmd].name.toUpperCase()) {
                    commandFound = commands[cmd].name;
                    commandDesc = commands[cmd].desc;
                    commandUsage = commands[cmd].usage;
                    commandGroup = commands[cmd].group;
                    break;
                }

            }


            if (commandFound === '') {
                message.channel.send({embed: {
                    description:`**No group or command found titled \`${args.join(" ")}\`**`,
                    color: 0x1D82B6,
                }}).then(function (message) {message.react("%F0%9F%97%91")}).catch

            }


            message.channel.send({embed: {
                title:'<> means required, [] means optional',
                color: 0x1D82B6,
                fields: [{
                    name:commandFound,
                    value:`**Description:** ${commandDesc}\n**Usage:** ${commandUsage}\n**Group:** ${commandGroup}`
                }]
		 }}).then(function (message) {message.react("%F0%9F%97%91")}).catch

            return;
        }

    }
