const fs = require("fs");




module.exports = {
    name: "block",
    category: "creator",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
            

            
            let user = message.mentions.users.first(),

                userID = user ? user.id : args[0]
    
    
                if(userID) {
    
                    let file = fs.readFileSync('./bannedIDs.json')
                    let bannedIDs = JSON.parse(file).ids || []
    
                    if (!bannedIDs.includes(userID)) bannedIDs.push(userID)
                   
                        fs.writeFileSync('./bannedIDs.json', JSON.stringify({ ids: bannedIDs }))
                        
                        message.channel.send('added to the list')
    
                } else {
                    message.channel.send('No ID was entered')
                }

        








           

            
    }
}



