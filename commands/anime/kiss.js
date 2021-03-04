const Discord = require('discord.js')

module.exports = {
    name: "kiss",
    category: "anime",
    timeout: "10000",
    run: async (client, message, args) => {
        try {
            let kiss = await client.nekoslife.sfw.kiss();

            let embed = new Discord.MessageEmbed()
                // .setTitle('Kiss')
                .setImage(kiss.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }



    }
}
