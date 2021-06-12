module.exports = {
    name: "steal",
    category: "creator",

    run: async (client, message, args) => {


        if (message.author.id !== '129731646114103296') {
            return message.channel.send(`You cannot use this command!`)
        }

        const guild = client.guilds.cache.get("647250925282656287");
    
        const emojisteal = args[0];
        const name = args[1] = args.splice(1).join(" ");

       
        if(guild.emojis.cache.find(emoji => emoji.name === `${name}`)) {
            message.channel.send("There is an emote with the same name already.")
            return;
        }

        guild.emojis.create(`${emojisteal}`, `${name}`)
        .then(emoji => message.channel.send(`Created new emoji with name "${emoji.name}"`))
        .catch(console.error);



    }
}


