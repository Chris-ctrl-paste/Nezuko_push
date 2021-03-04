const axios = require('axios');
const api = require('../../data.json');
const blizzard_token = api.access_token;
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
require('dotenv').config();


module.exports = {
    name: "cut-eu",
    category: "blizzard",
    run: async (client, message, args) => {
        // if (!args[0]) {
        //     return message.channel.send(`Please enter city EU or US`)
        // }


        const url = `https://eu.api.blizzard.com/data/wow/pvp-season/29/pvp-reward/index?namespace=dynamic-eu&locale=en_eu&access_token=${blizzard_token}`;



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



var schedule = require('node-schedule');


var j = schedule.scheduleJob({ hour: 16, minute: 37 }, function () {
    console.log('Time for tea!');
    createAccessToken();
});


const apiKey =  process.env.apiKey
const apiSecret = process.env.apiSecret




function createAccessToken(region = 'eu') {
    return new Promise((resolve, reject) => {
        let credentials = Buffer.from(`${apiKey}:${apiSecret}`);

        const requestOptions = {
            host: `${region}.battle.net`,
            path: '/oauth/token',
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials.toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let responseData = '';
        function requestHandler(res) {
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                let data = JSON.parse(responseData)
                resolve(data);

                console.log(data)

                const json = JSON.stringify(data, null, " ")


                fs.writeFile("data.json", json, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });


            });


        }


        let request = require('https').request(requestOptions, requestHandler);
        request.write('grant_type=client_credentials');
        request.end();

        request.on('error', (error) => {
            reject(error);
        });
    });
}