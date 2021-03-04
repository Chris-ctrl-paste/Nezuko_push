
const config = require("../../botconfig.json");
const converToken = config.convToken;

const request = require('node-superfetch');
let currencies = null;
let rates = new Map();





async function fetchCurrencies() {
    const { body } = await request.get(`https://free.currconv.com/api/v7/currencies?apiKey=${converToken}`);
    currencies = body.results;
    return body.results;
    
}

  async function fetchRate(base, target) {
        const query = `${base.id}_${target.id}`;
		if (rates.has(query)) return rates.get(query);
		const { body } = await request
            // .get('https://free.currencyconverterapi.com/api/v5/convert?apikey=f2ca15946f749b2c88b7')
            .get(`https://free.currconv.com/api/v7/convert?apiKey=${converToken}`)
			.query({
				q: query,
                compact: 'ultra',
                
			});
		rates.set(query, body[query]);
		setTimeout(() => rates.delete(query), 1.8e+6);
		return body[query];
    }







module.exports = {
    name: 'currency',
    category: "info",
    timeout: "10000",
    description: 'currency converter',
    run: async(client, message, args)  => {

        if (args.length < 3) {
            message.channel.send(`Follow this format: 'Amount' 'Base Currency' 'Target Currency' \n https://www.countries-ofthe-world.com/world-currencies.html for currency ISO-codes .`);
        }

        let amount = parseInt(args[0]);
        // if (!amount) {
        //     message.channel.send(' please enter a valid number for amount.');
        // }

        let base = args[1].toUpperCase();
        // if (!base) {
        //     message.channel.send(' pleae enter the base currency.');
        // }

        let target = args[2].toUpperCase();
        // if (!target) {
        //     message.channel.send(' please enter the target currency.');
        // }

        try {
			if (!currencies) await fetchCurrencies();
			base = currencies[base];
			if (!base) return message.channel.send('Invalid base.');
			target = currencies[target];
			if (!target) return message.channel.send('Invalid target.');
			if (base.id === target.id) return message.channel.send(`Converting ${base.id} to ${target.id} is the same value`);
			const rate = await fetchRate(base, target);
			return message.channel.send(`${amount} ${base.id} is ${(amount * rate).toFixed(2)} ${target.id}.`);
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    },

   
  
};