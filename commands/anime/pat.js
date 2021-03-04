const Discord = require('discord.js')

module.exports = {
    name: "pat",
    category: "anime",
    timeout: "10000",
    run: async (client, message, args) => {
        try {
            let pat = await client.nekoslife.sfw.pat();

            let embed = new Discord.MessageEmbed()
                // .setTitle('Tickle')
                .setImage(pat.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }



    }
}
