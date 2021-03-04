const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "eu-time",
    category: "time",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send(`Please enter city name`)
        }

        const url = `http://worldtimeapi.org/api/timezone/europe/${args} `;

        let response, Time;
        try {
            response = await axios.get(url);
            Time = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Time: ${args}`)
            .addFields(
                {
                    name: "Timezone abbreviation",
                    value: `${Time.abbreviation} `

                },
                {
                    name: "Time",
                    // value: times()
                    value: `${Time.datetime.slice(11, 16)} `
                },
                {
                    name: "Day of year",
                    value: `${Time.day_of_year} `
                },
                {
                    name: "Week",
                    value: `${Time.week_number} `
                },
            )

        await message.channel.send(embed)















    }
}
