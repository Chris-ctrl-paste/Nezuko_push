module.exports = {
    name: "steal",
    category: "creator",

    run: async (client, message, args) => {
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


