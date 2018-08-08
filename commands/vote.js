const Discord = module.require('discord.js');
const agree = "✅";
const disagree = "❎";

module.exports.run = async (bot, message, args) => {


          message.channel.bulkDelete(1);
          let voteArgs = message.content.slice(1 + 4).split(",");
          if (!voteArgs[1]) {
               timer = 30
          } else {
               timer = voteArgs[1]
          }


          //	console.log(voteArgs[0])
          //	console.log(timer)



          let msg = await message.channel.send("@everyone \n Vote now for `" + voteArgs[0] + "` during `" + timer + "` Seconds !!");
          await msg.react(agree);
          await msg.react(disagree);

          const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {
               time: timer * 1000
          });
          msg.delete();

          var NO_Count = reactions.get(disagree).count;
          var YES_Count = reactions.get(agree);

          if (YES_Count == undefined) {
               var YES_Count = 1;
          } else {
               var YES_Count = reactions.get(agree).count;
          }

          var embed = new Discord.RichEmbed()

               .addField("Voting Finished:", "----------------------------------------\n" +
                    " " + voteArgs[0] + " \n" +
                    "----------------------------------------\n" +
                    "Total votes  NO : " + `${NO_Count-1}\n` +
                    "Total votes  Yes : " + `${YES_Count-1}\n` +
                    "----------------------------------------", true)

               .setColor("0x36393e")

          await message.channel.send({
               embed: embed
          });
          message.author.send({
               embed: embed
          });


}
