

const { MessageEmbed } = require('discord.js')
const {promptMessage} = require('../../utility')


// let choices = ['rock', 'paper', 'scissors'];
const chooseArr = ["🗻", "📰", "✂"];



module.exports = {
    name: "rps",
    category: "other",
    run: async (client, message, args) => {


        const embed = new MessageEmbed()
        .setColor("#ffffff")
        .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
        .setDescription("Add a reaction to one of these emojis to play the game!")
        .setTimestamp();

    const m = await message.channel.send(embed);
    // Wait for a reaction to be added
    const reacted = await promptMessage(m, message.author, 30, chooseArr);

    // Get a random emoji from the array
    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    // Check if it's a win/tie/loss
    const result = await getResult(reacted, botChoice);
    // Clear the reactions
    await m.reactions.removeAll().catch(error => console.error('failed to clear reactions', error))

    embed
        .setDescription("")
        .addField(result, `${reacted} vs ${botChoice}`);

    m.edit(embed);

    function getResult(me, clientChosen) {
        if ((me === "🗻" && clientChosen === "✂") ||
            (me === "📰" && clientChosen === "🗻") ||
            (me === "✂" && clientChosen === "📰")) {
                return "You won!";
        } else if (me === clientChosen) {
            return "It's a tie!";
        } else {
            return "You lost!";
        }
    }
    
    }
}


