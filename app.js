// package
const Discord = require("discord.js");
const delay = require('delay');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const utils = require('bot-utils'); // use discord.js

var bot = new Discord.Client();

const func = require('./storage/functions.js');
const config = require("./storage/config.json")
//global settings
const youtube = new YouTube(config.key);
const queue = new Map();
const prefix = ","; // bot's prefix


var presences = [
     ",help | ,help [group or command]",
     "Dm me to contact an admin"

]

//function
async function handleVideo(video, message, voiceChannel, playlist = false) {
     const serverQueue = queue.get(message.guild.id);
     console.log(`now playing | ${video.title}`);
     var song = {
          id: video.id,
          title: video.title,
          url: `https://www.youtube.com/watch?v=${video.id}`
     };







     if (!serverQueue) {
          const queueConstruct = {
               textChannel: message.channel,
               voiceChannel: voiceChannel,
               connection: null,
               songs: [],
               volume: 25,
               playing: true
          };
          queue.set(message.guild.id, queueConstruct);

          queueConstruct.songs.push(song);

          try {
               var connection = await voiceChannel.join();
               queueConstruct.connection = connection;
               play(message.guild, queueConstruct.songs[0]);
          } catch (error) {
               console.error(`i cant join voice channel ${error}`);
               queue.delete(message.guild.id);
               return message.channel.send(`i cant join voice channel ${error}`);
          }
     } else {
          serverQueue.songs.push(song);
          console.log(serverQueue.songs);
          if (playlist) return undefined;
          else return message.channel.send(`**${song.title}** has been added to the queue !`)
     }
     return undefined;
}

function play(guild, song) {
     const serverQueue = queue.get(guild.id);
     if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;

     }
     const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
          .on('end', reason => {
               if (reason === 'Stream is not generating quickly enough.') console.log(`song ended`);
               console.log(reason);
               serverQueue.songs.shift();
               play(guild, serverQueue.songs[0]);
          })
          .on('error', () => console.log(error));
     dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
     serverQueue.textChannel.send(`Start playing **${song.title}**`)
}

function hook(channel, title, message, color, avatar) { // This function uses quite a few options. The last 2 are optional.

     // if (!channel) return console.log('Channel not specified.');
     if (!title) return console.log('Title not specified.');
     if (!message) return console.log('Message not specified.');
     if (!color) color = 'd9a744';
     if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png'

     color = color.replace(/\s/g, '');
     avatar = avatar.replace(/\s/g, '');


     channel.fetchWebhooks()
          .then(webhook => {

               let foundHook = webhook.find('name', 'Webhook');

               if (!foundHook) {
                    channel.createWebhook('Webhook', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png')
                         .then(webhook => {
                              // Finally send the webhook
                              webhook.send('', {
                                        "username": title,
                                        "avatarURL": avatar,
                                        "embeds": [{
                                             "color": parseInt(`0x${color}`),
                                             "description": message
                                        }]
                                   })
                                   .catch(error => {
                                        console.log(error);
                                        return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                                   })
                         })
               } else {
                    foundHook.send('', {
                              "username": title,
                              "avatarURL": avatar,
                              "embeds": [{
                                   "color": parseInt(`0x${color}`),
                                   "description": message
                              }]
                         })
                         .catch(error => {
                              console.log(error);
                              return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                         })
               }

          })

}

function timestamp(addon_msg) {
     let calendar = new Date();
     // ECMA 2017 String.prototype.padStart(), IE not supported
     let d = calendar.getDate().toString().padStart(2, 0);
     let m = calendar.getMonth().toString().padStart(2, 0);
     let y = calendar.getFullYear().toString().padStart(2, 0);
     let h = calendar.getHours().toString().padStart(2, 0);
     let mm = calendar.getMinutes().toString().padStart(2, 0);
     let s = calendar.getSeconds().toString().padStart(2, 0);
     const viewer = `[${d}-${m}-${y}|${h}\:${mm}\:${s}] [${addon_msg}]`;
     return viewer;
}

;



//listener on message
bot.on("message", async message => {

     const msg = message.content.toUpperCase();
     const sender = message.author;
     const args = message.content.slice(1).trim().split(/ +/g);
     const searchString = args.slice(1).join(' ');
     const url = args[1];
     console.log(url);
     //console.log(args);


     if (message.guild === null) {
          if (sender.bot) return;





          if (!message.content.startsWith(prefix)) {
               message.channel.send({
                    embed: {
                         color: 0x36393e,
                         title: `your message as benn send to an admin !`,
                         description: `*${message.content}*`,
                         author: {
                              name: bot.user.username,
                              icon_url: bot.user.avatarURL
                         }
                    }
               })




               bot.channels.get(config.help).send({
                    embed: {
                         color: 0x36393e,
                         footer: {
                              text: `id: ${message.author} `
                         },
                         description: `*${message.content}*`,
                         timestamp: "",
                         author: {
                              name: message.author.tag,
                              icon_url: message.author.avatarURL
                         }
                    }
               }).then(function(message) {
                    message.react("%F0%9F%97%91")
               }).catch

               return;
          }
     }





     if (!message.content.startsWith(prefix)) return;

	let djRole = message.guild.roles.find("name", "DJ");
	let adminRole = message.guild.roles.find("name", "admin");









































     //
     if (msg.startsWith(prefix + "HOOK")) {
          if (message.member.roles.has(adminRole.id)) {
               message.delete();
               if (msg === prefix + 'HOOK') {
                    return hook(message.channel, 'Hook usage', `${prefix}hook <title> <message>, [HEXcolor], [avatarURL]\n\n**<> is required \n[]is optional**`, 'FC8469', 'https://cdn4.iconfinder.com/data/icons/global-logistics-3/512/129-512.png')
               }
               let hookArgs = message.content.slice(1 + 4).split(",");
               hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);
          } else {
               message.channel.send('You need admin role to use this command');
          }
     }







     const serverQueue = queue.get(message.guild.id);

     if (message.content.startsWith(prefix + 'play')) {
		if (message.member.roles.has(djRole.id)) {
		if(message.channel.id == config.dj){
               const voiceChannel = message.member.voiceChannel;
               if (!voiceChannel) return message.channel.send('sorry you need to be in a voice channel'); //console.log(voiceChannel);

               if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                    const playlist = await youtube.getPlaylist(url);
                    console.log(playlist);
                    const videos = await playlist.getVideos();
                    for (const video of Object.values(videos)) {
                         const video2 = await youtube.getVideoByID(video.id);
                         await handleVideo(video2, message, voiceChannel, true);
                    }
                    return message.channel.send(`Playlist **${playlist.title}** has been added to queue !`);
               } else {

                    try {
                         var video = await youtube.getVideo(url);
                    } catch (error) {
                         try {
                              var videos = await youtube.searchVideos(searchString, 1);
                              var video = await youtube.getVideoByID(videos[0].id)
                         } catch (err) {
                              console.log(err)
                              return message.channel.send(`i could not find ur song`)
                         }
                    }

                    return handleVideo(video, message, voiceChannel);
               }
          } else {
			message.channel.send('Please go in **DJ** channel !')
          }
     } else {
		message.channel.send('You need DJ role to use this command');
	}
}








     if (message.content.startsWith(prefix + 'stop')) {
          if (message.member.roles.has(djRole.id)) {
			if(message.channel.id == config.dj){
               if (!message.member.voiceChannel) return message.channel.send('u are not in voice channel !');
               if (!serverQueue) return message.channel.send('there is nothing playing so i cant stop !')
               serverQueue.songs = [];
               serverQueue.connection.dispatcher.end('stop command has been used');
               return undefined;
          }else {
			message.channel.send('Please go in **DJ** channel !')
		}
	} else {
               message.channel.send('You need DJ role to use this command');
          }
     }

     if (message.content.startsWith(prefix + 'skip')) {
		if(message.channel.id == config.dj){
          if (message.member.roles.has(djRole.id)) {
               if (!message.member.voiceChannel) return message.channel.send('u are not in voice channel !');
               if (!serverQueue) return message.channel.send('there is nothing playing so i cant skip !')
               serverQueue.connection.dispatcher.end('skip command has been used');
               return undefined;
          } else {
               message.channel.send('You need DJ role to use this command');
          }
     } else {
		message.channel.send('Please go in **DJ** channel !')
	}
     }

     if (message.content.startsWith(prefix + 'np')) {
          if (!serverQueue) return message.channel.send('there is nothing playing !')
          return message.channel.send(`Now playing: **${serverQueue.songs[0].title}**`)
     }


     if (message.content.startsWith(prefix + 'volume')) {
		if(message.channel.id == config.dj){
          if (message.member.roles.has(djRole.id)) {
               if (!message.member.voiceChannel) return message.channel.send('u are not in voice channel !');
               if (!serverQueue) return message.channel.send('there is nothing playing !')
               if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
               serverQueue.volume = args[0];
               serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
               return message.send(`Set the volume to: **${args[1]}**`);
          } else {
               message.channel.send('You need DJ role to use this command');
          }
     } else {
		message.channel.send('Please go in **DJ** channel !')
	}
     }


     if (message.content.startsWith(prefix + 'queue')) {
          if (!serverQueue) return message.channel.send('there is nothing playing !');
          return message.channel.send(`
__**Song queue**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join(`\n`)}

**Now playing:** ${serverQueue.songs[0].title}
			`);
     }


     if (message.content.startsWith(prefix + 'pause')) {
		if(message.channel.id == config.dj){
          if (message.member.roles.has(djRole.id)) {
               if (serverQueue && serverQueue.playing) {
                    serverQueue.playing = false;
                    serverQueue.connection.dispatcher.pause();
                    return message.channel.send(`Pause the music !`);
               }
               return message.channel.send('there is nothing playing !')

          } else {
               message.channel.send('You need DJ role to use this command');
          }
     } else {
		message.channel.send('Please go in **DJ** channel !')
	}
}

     if (message.content.startsWith(prefix + 'resume')) {
		if(message.channel.id == config.dj){
          if (message.member.roles.has(djRole.id)) {
               if (serverQueue && !serverQueue.playing) {
                    serverQueue.playing = true;
                    serverQueue.connection.dispatcher.resume();
                    return message.channel.send(`Resume the music !`);
               }
               return message.channel.send('there is nothing in pause !')

          } else {
               message.channel.send('You need DJ role to use this command');
          }
     }else {
		message.channel.send('Please go in **DJ** channel !')
	}
     }


	const command = args.shift().toLowerCase();

     try {

          //
          let commandFile = require(`./commands/${command}.js`);
          commandFile.run(bot, message, args, func);
     } catch (e) {
          console.log(e.message);
     } finally {
          console.log(`${timestamp("commands")} ${message.author.username} run the command: ${message.content}`)
     }






     return undefined;
});

bot.on("ready", function() {
     bot.user.setActivity(utils.randItemFromArray(presences)).then(() => {
          setTimeout(() => {
               bot.user.setActivity(utils.randItemFromArray(presences))
          }, 300000)
     })
     bot.user.setStatus("DISCONNECTED")
     console.log(`${timestamp("ReadyBot")} Bot has successfully deployed!`);
});

bot.on('guildMemberAdd', member => {
     const welcomechannel = member.guild.channels.find('name', 'member-logs')

     var newuserjoinembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setAuthor(member.user.tag + ' has joined server', member.user.displayAvatarURL)
          .addField(`:inbox_tray: Welcome To The Server ${member.user.tag}`)
          .setFooter(`User joined`)
          .setTimestamp()
     return welcomechannel.send(newuserjoinembed);
});

bot.on('guildMemberRemove', member => {
     const goodbyechannel = member.guild.channels.find('name', 'member-logs')

     var newuserjoinembed = new Discord.RichEmbed()
          .setColor('#FF0000')
          .setAuthor(member.user.tag + ' has left server', member.user.displayAvatarURL)
          .addField(`:outbox_tray: Goodbye ${member.user.tag} :disappointed_relieved: `, 'Peace')
          .setFooter(`User left`)
          .setTimestamp()
     return goodbyechannel.send(newuserjoinembed);
});


bot.on('messageReactionAdd', (reaction, user) => {
     if (user.bot) return;
     //console.log(reaction.emoji.identifier); //only enable if you need to find the emoji identifier

     if (reaction.emoji.identifier == "%F0%9F%97%91") {
          reaction.message.delete()
          reaction.remove(user).then(reaction => {});
	}













});








//just token
{
     bot.login(config.token)
}
