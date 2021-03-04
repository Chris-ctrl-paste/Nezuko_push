const Discord = require('discord.js')

module.exports = {
    name: "avatar",
    category: "anime",
	 timeout: "10000",
    run: async (client, message, args) => {
        try {
            let avatar = await client.nekoslife.sfw.avatar();

            let embed = new Discord.MessageEmbed()
                // .setTitle('Tickle')
                .setImage(avatar.url)
                .setColor('#363942');



            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }



    }
}
