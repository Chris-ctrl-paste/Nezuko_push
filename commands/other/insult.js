const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "insult",
    category: "other",
    run: async (client, message, args) => {
        const baseUrl = "https://evilinsult.com/generate_insult.php?lang=en&type=json";



        let data, response;
        try {
            response = await axios.get(baseUrl);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random insult `)
            .setDescription(data.insult)
            .setColor('#f3f3f3')


        await message.channel.send(embed)
    }
};