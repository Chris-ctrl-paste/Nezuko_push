const { MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = {
    name: "moti",
    category: "other",
    run: async (client, message, args) => {


        const jsonQuotes = fs.readFileSync(
            'resources/quotes/motivational.json',
            'utf8'
        );
        const quoteArray = JSON.parse(jsonQuotes).quotes;

        const randomQuote =
            quoteArray[Math.floor(Math.random() * quoteArray.length)];

        const quoteEmbed = new MessageEmbed()
            .setTitle(randomQuote.author)
            .setDescription(randomQuote.text)
            .setColor('#ff003c');
        return message.channel.send(quoteEmbed);




    }
}