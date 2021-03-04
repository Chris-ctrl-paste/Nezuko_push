const Discord = require('discord.js')

module.exports = {
    name: "tickle",
    category: "anime",
    timeout: "10000",
    run: async (client, message, args) => {
        try {
            let tickle = await client.nekoslife.sfw.tickle();

            let embed = new Discord.MessageEmbed()
                // .setTitle('Tickle')
                .setImage(tickle.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }



    }
}
