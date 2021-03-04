module.exports = async member => {

    // this is finding the channel goodbye
    const channel = member.guild.channels.cache.find(ch => ch.id === '759453597142089729');
    if (!channel) return;

    // this is sending a message
    channel.send(`Goodbye, ${member}!`);
};