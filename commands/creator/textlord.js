const ocrSpace = require('ocr-space-api-wrapper')



module.exports = {
    name: "textra",
    category: "creator",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296') {
            return message.channel.send(`You cannot use this command!`)
        }
        
                const res1 = await ocrSpace(`${args}`)
                console.log(res1)

                try {
                    return message.channel.send(`${res1.ParsedResults.map(parse => parse.ParsedText)}`);
                } catch (err) {
                    if (err.status === 404 || err.status === 500) return message.reply('Invalid date/Server might be down.');
                    return message.reply(`${res1.ErrorMessage}`);
                }
 


    }
}
