const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "fortune",
    category: "other",
    timeout: "5000",
    run: async (client, message, args) => {
        const baseUrl = "http://yerkee.com/api/fortune";



        let data, response;
        try {
            response = await axios.get(baseUrl);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Fortune Cookie `)
            .setDescription(data.fortune)
            .setColor('#f3f3f3')


        await message.channel.send(embed)
    }
};