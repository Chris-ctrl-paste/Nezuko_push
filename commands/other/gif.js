
const fetch = require('node-fetch');
const { tenorAPI } = require('../../botconfig.json');




module.exports = {
    name: "gif",
    category: "other",
    timeout: "5000",

    run: async (client, message, args) => {
        fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=${args}&limit=1`)
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.channel.send('Failed to find a gif that matched your query. !gif anime for example');
                // console.error(e);
                return;
            });
    }
};





