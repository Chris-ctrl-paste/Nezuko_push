const fs = require('fs');
require('dotenv').config();




module.exports = {
    name: "refreshu",
    category: "creator",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
          



                createAccessToken()

                client.users.cache.get('129731646114103296').send('I am Refreshed!')
                .catch(console.error)

            
    }
}



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