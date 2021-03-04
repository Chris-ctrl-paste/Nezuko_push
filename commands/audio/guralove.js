const path = require('path')
var ffmpeg = require('ffmpeg');

module.exports = {
    name: "gura_love",
    category: "audio",
    timeout: "600000",
    run: async (client, message, args) => {
       

	  if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You cannot use that command, ${message.author.username}` // returns this message to user with no perms
            );







        const { voice } = message.member

        if (!voice.channelID) {
            message.reply('You must be in a voice channel')
            return
        }



        voice.channel.join().then((connection) => {
            const dispatcher = connection.play(require("path").join(__dirname, '../../resources/soundfiles/gura_loveyou.mp3'), { volume: 0.5 });
            dispatcher.on('finish', () => voice.channel.leave());
        }).catch(err => console.log(err))



    }
}