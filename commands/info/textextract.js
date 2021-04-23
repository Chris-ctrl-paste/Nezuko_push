const ocrSpace = require('ocr-space-api-wrapper')



module.exports = {
    name: "text-ex",
    category: "info",
    timeout: 900000,
    run: async (client, message, args) => {

       
        
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
