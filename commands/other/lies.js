


module.exports = {
    name: "lies",
    category: "other",
    run: async (client, message, args) => {

        try {
            message.channel.send('Your messages are ' + Math.floor(Math.random() * 99) + '% lies');
        } catch (err) {
            message.channel.send('Their was an error!\n' + err).catch();
        }
    }
};





