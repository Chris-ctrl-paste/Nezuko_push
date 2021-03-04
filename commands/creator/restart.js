
const config = require("../../botconfig.json");


module.exports = {

    name: "restart",
    category: "creator",
    run: async (client, message, args) => {
        if (message.author.id !== '129731646114103296') {
            return message.channel.send(`You cannot use this command!`)
        }

        message.channel.send(`Okay, I'll restart...`)
            .then(() => client.destroy()) // <<<<
            .then(() => client.login(config.token)) // <<<<
    }
}