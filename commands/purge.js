

exports.run = (bot, message, args, func) => {

    async function purge() {
        message.delete();
        if (!message.member.roles.find("name", "admin")) {
          message.channel.send('You need the \`ADMIN\` role to use this command.');
          return;
        }

        // check if the argument is a number
        if (isNaN(args[0])) {
            message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
            return;
        }

        const fetched = await message.channel.fetchMessages({limit: args[0]});
        console.log(fetched.size + ' messages found, deleting...');

        // Deleting the messages
        message.channel.bulkDelete(fetched)
    }
    purge();


}
