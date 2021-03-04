const { tenorAPI } = require('../../botconfig.json');


const fetch = require('node-fetch');


module.exports = {
    name: "anime",
    category: "anime",
    timeout: "5000",

    run: async (client, message, args) => {
        fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=anime&limit=1`)
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.channel.send('Failed to find a gif :slight_frown:');
                // console.error(e);
                return;
            });
    }
};