const Discord = require('discord.js')

module.exports = {
    name: "slap",
    category: "anime",
    timeout: "10000",
    run: async (client, message, args) => {
        try {
            let slap = await client.nekoslife.sfw.slap();

            let embed = new Discord.MessageEmbed()
                // .setTitle('Kiss')
                .setImage(slap.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }



    }
}
