



module.exports = {
    name: "dm",
    category: "creator",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );

             

               
                

                const id = args[0];
                const dm = args[1] = args.splice(1).join(" ")
               
            



            
            client.users.fetch(`${id}`, false).then((user) => {
                user.send(`${dm}`);
               });

       
    }
}
