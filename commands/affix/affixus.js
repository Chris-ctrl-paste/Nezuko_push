const axios = require('axios');

const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "affix-na",
    category: "affix",
    run: async (client, message, args) => {
        // if (!args[0]) {
        //     return message.channel.send(`Please enter city EU or US`)
        // }



        const url = ` https://raider.io/api/v1/mythic-plus/affixes?region=us`


        let response, affixx;

        try {
            response = await axios.get(url);
            affixx = response.data;



        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }




        const embed = new MessageEmbed()


        const affixes = affixx.affix_details


        let fields = [];


        affixes.forEach((affix) => {
            let field = {
                name: affix.name + "\n",
                value: "" + "\n",
                inline: true
            };

            if (affix !== undefined) {
                field.value += affix.description


            }

            fields.push(field);
        })


        embed.fields = fields;


        await message.channel.send(embed)


    }
}

