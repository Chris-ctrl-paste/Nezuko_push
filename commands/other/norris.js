const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "norris",
    category: "other",
    run: async (client, message, args) => {
        const baseUrl = "https://api.chucknorris.io/jokes/random";



        let data, response;
        try {
            response = await axios.get(baseUrl);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Chuck Norris Fact `)
            .setDescription(data.value)
            .setColor('#f3f3f3')


        await message.channel.send(embed)
    }
};