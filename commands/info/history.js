const request = require('node-superfetch');
const Discord = require('discord.js');

module.exports = {
    name: 'history',
    category: 'info',
    description: 'Mankind will always repeat history!',
    timeout: 15000,
    run: async (client, message, args, ) => {
        const month = parseInt(args[0]);
        const day = parseInt(args[1]);


        if(isNaN(day)) {
            return message.reply('Please enter a valid date');
        }


        if(isNaN(month)) {
            return message.reply('Please enter a valid month');
        }

        

        const date = month && day ? `/${month}/${day}` : '';
		try {
			const { text } = await request.get(`http://history.muffinlabs.com/date${date}`);
			const body = JSON.parse(text);
			const events = body.data.Events;
			const event = events[Math.floor(Math.random() * events.length)];
			const embed = new Discord.MessageEmbed()
				.setColor(0x9797FF)
				.setURL(body.url)
				.setTitle(`On this day (${body.date})...`)
				.setTimestamp()
				.setDescription(`${event.year}: ${event.text}`)
				.addField('❯ See More',
					event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, '%29')})`).join(', '));
            
            return message.channel.send(embed);
        } 
        catch (err) {
			if (err.status === 404 || err.status === 500) return message.reply('Invalid date/Server might be down.');
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    }
}