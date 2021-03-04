
module.exports = {
    name: "botwipe",
    category: "creator",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
            if (!args[0]) {
                return message.channel.send(`Please enter a amount 1 to 1000`)
            }
    


            let deleteAmount;

            if (parseInt(args[0]) > 1000) {
                deleteAmount = 1000;
            } else {
                deleteAmount = parseInt(args[0]);
            }
    


           message.channel.messages.fetch({limit: deleteAmount})
            .then(messages => messages.array().forEach(
                message => message.author.equals(client.user) && message.delete()
            ));
    
    
    }
}