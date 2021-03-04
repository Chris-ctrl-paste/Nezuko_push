const Discord = require('discord.js')

module.exports = {
    name: "waifu",
    category: "anime",
    timeout: "10000",
    run: async (client, message, args) => {
        try {
            let waifu = await client.nekoslife.sfw.waifu();

            let embed = new Discord.MessageEmbed()
                // .setTitle('Tickle')
                .setImage(waifu.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }



    }
}
