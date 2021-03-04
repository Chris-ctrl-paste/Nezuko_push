const math = require('mathjs');


module.exports = {
    name: "math",
    category: "other",
    run: async (client, message, args) => {


        try {
            if (!args[0]) return message.reply('You need to input the math problem!');

            message.channel.send('Answer: ' + math.evaluate(args.join(' ')));
        } catch (err) {
            message.channel.send('Their was an error!\n' + err).catch();
        }
    }
};














