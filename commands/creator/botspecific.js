
module.exports = {
    name: "nezspec",
    category: "creator",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
          
            
        

           message.channel.messages.fetch(`${args}`)
            .then(message => message.author.equals(client.user) && message.delete()
            );
    


            
    }
}