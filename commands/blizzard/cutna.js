const axios = require('axios');
const api = require('../../data.json');
const blizzard_token = api.access_token;
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "cut-na",
    category: "blizzard",
    run: async (client, message, args) => {
        // if (!args[0]) {
        //     return message.channel.send(`Please enter city EU or US`)
        // }



        const url = `https://us.api.blizzard.com/data/wow/pvp-season/29/pvp-reward/index?namespace=dynamic-us&locale=en_us&access_token=${blizzard_token}`


        let response, arena;

        try {
            response = await axios.get(url);
            arena = response.data;



        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }




        const embed = new MessageEmbed()


        const bracket = arena.rewards


        let fields = [];


        bracket.forEach((bracket) => {
            let field = {
                name: bracket.bracket.type + "\n",
                value: "" + "\n",

            };

            if (bracket !== undefined) {
                field.value += bracket.faction.type + "\n";
                field.value += bracket.rating_cutoff

            }

            fields.push(field);
        })


        embed.fields = fields;


        await message.channel.send(embed)


    }
}

