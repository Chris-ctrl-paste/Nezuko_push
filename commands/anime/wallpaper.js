const Discord = require('discord.js');


module.exports = {
    name: "wallpaper",
    category: "anime",
    timeout: "10000",


    run: async (client, message, args) => {

        try {
            let wallpaper = await client.nekoslife.sfw.wallpaper();

            let embed = new Discord.MessageEmbed()
                // .setTitle(tickle.msg)
                .setImage(wallpaper.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }


    }
}