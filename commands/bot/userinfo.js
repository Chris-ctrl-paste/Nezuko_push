
const Discord = require('discord.js');


module.exports = {
    name: "userinfo",
    category: "bot",
    timeout: "10000",
    run: async (client, message, args) => {

        try {
            let user = message.mentions.members.first() || message.member;

            let embed = new Discord.MessageEmbed()
                .setTitle(user.user.username)
                .setDescription(`ID: ${user.id}
        Name: ${user.user.username}
        
        Account Created At: ${user.user.createdAt}
        Game: ${user.user.presence.game || 'none'}
        
        Full Name: ${user.user.tag}`)
                .setThumbnail(user.user.avatarURL)
                .setColor('#eeeeee');

            message.channel.send(embed);
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }


    }
}










