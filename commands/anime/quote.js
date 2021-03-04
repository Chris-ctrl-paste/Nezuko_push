const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "quote",
    category: "anime",
    run: async (client, message, args) => {
        const url = 'https://some-random-api.ml/animu/quote';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`@${message.author.username} `)
            .addFields(
                {
                    name: `${data.characther} `,
                    value: `${data.sentence}  `,
                    inline: true
                }

            )
        await message.channel.send(embed)
    }
}