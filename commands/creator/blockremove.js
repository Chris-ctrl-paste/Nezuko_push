const fs = require("fs");




module.exports = {
    name: "blockremove",
    category: "creator",
    run: async (client, message, args, member) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
            
      

                let file = fs.readFileSync('./bannedIDs.json')
                let bannedIDs = JSON.parse(file).ids || []


                let user = message.mentions.users.first(),

                userID = user ? user.id : args[0]

                    if (!bannedIDs.includes(userID))
                    return message.channel.send(
                        `I do not have that ID`
                    );

                let newFile = {
                ids: bannedIDs.filter(id => id != userID)
                }
                fs.writeFileSync('./bannedIDs.json', JSON.stringify(newFile))
                     message.channel.send('Removed from to the list')


                            
            }
}


        

