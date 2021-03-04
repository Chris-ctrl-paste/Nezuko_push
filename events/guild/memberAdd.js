module.exports = async (member) => {



    // this is finding the welcome channel
    const channel = member.guild.channels.cache.find(ch => ch.id === '759453597142089729');
    if (!channel) return;

    // this is sendint the message
    channel.send(`Welcome to the server, ${member}!`);

};