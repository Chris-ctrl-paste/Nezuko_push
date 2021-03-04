const axios = require('axios');
const api = require('../../data.json');
const blizzard_token = api.access_token;
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "token-na",

    category: "blizzard",
    run: async (client, message, args) => {
        // if (!args[0]) {
        //     return message.channel.send(`Please enter city EU or US`)
        // }


        const url = `https://us.api.blizzard.com/data/wow/token/index?namespace=dynamic-us&locale=en_us&access_token=${blizzard_token}`;



        let response, tokeneu;

        try {
            response = await axios.get(url);
            tokeneu = response.data;



        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }




        // const bigeu = tokeneu.price

        const embed = new MessageEmbed()

            .setTitle("Token: " + `${tokeneu.price.toString().slice(0, 3)}` + "k")
            .setColor(`#f3f3f3`)

        await message.channel.send(embed)




    }
}
