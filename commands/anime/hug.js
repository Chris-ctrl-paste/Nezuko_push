const Discord = require('discord.js')

module.exports = {
    name: "hug",
    category: "anime",
    timeout: "10000",
    run: async (client, message, args) => {
        try {
            let hug = await client.nekoslife.sfw.hug();

            let embed = new Discord.MessageEmbed()
                // .setTitle('Tickle')
                .setImage(hug.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }



    }
}
