const Discord = require('discord.js')

module.exports = {
    name: "cuddle",
    category: "anime",
    timeout: "10000",
    run: async (client, message, args) => {
        try {
            let cuddle = await client.nekoslife.sfw.cuddle();

            let embed = new Discord.MessageEmbed()
                // .setTitle('Tickle')
                .setImage(cuddle.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }



    }
}
