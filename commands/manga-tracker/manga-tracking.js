const fileName = '../../bot-manga.json';
const file = require(fileName);




module.exports = {
    name: "mtrack",
    category: "manga-tracker",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
            
                const parse = JSON.stringify(file)
                message.channel.send(parse)
  

    }
}


