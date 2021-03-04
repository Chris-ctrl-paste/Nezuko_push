
function Answers() {
    const possibleAnswers = [
        'wut',
        'yes',
        'no',
        '...no u',
        'idk',
        'No',
        'yes',
        'uhh',
        'i dont think so m8',
        'The answer lies within']
    var rand = Math.floor(Math.random() * 10);
    return possibleAnswers[rand];
}


module.exports = {
    name: "8ball",
    category: "other",
    run: async (client, message, args) => {

        try {
            if (args[0]) message.channel.send(Answers());
            else message.reply('You need to provide a question!');
        } catch (err) {
            message.channel.send('There was an error!\n' + err).catch();
        }

    }
};