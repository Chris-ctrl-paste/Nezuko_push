const Discord = require('discord.js');
const { YTSearcher } = require('ytsearcher');
const { YOUTUBE_API_KEY } = require('../../botconfig.json');
const searcher = new YTSearcher(YOUTUBE_API_KEY);



module.exports = {
    name: "youtube",
    category: "other",
    timeout: "15000",
    run: async (client, message, args) => {

        try {
            if (!args[0]) return message.reply('You need to give something to search!');

            let msg = await message.channel.send('Searching YouTube...');

            searcher.search(args.join(' ')).then(info => {
                if (!info.first) return message.reply('I couldn\'t find anything on Youtube with your query!');

                let embed = new Discord.MessageEmbed()
                    .setTitle(info.first.title)
                    .setURL(info.first.url)
                    .setImage(info.first.thumbnails.high.url)
                // .setColor('#eeeeee');

                msg.edit(embed);
            });

        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }




    }
}












