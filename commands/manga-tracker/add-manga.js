const fs = require('fs');
const fileName = '../../bot-manga.json';
const file = require(fileName);



module.exports = {
    name: "madd",
    category: "manga-tracker",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
            
     

    const mangaURL = args[0];
    const chapternumber = args[1] = args.splice(1).join(" ")
    const ID = Math.floor(Math.random() * 1000);
  
    file.push({
        Id: `${ID}`,  
        url_ends_with: `${mangaURL}`,
        last_chapter: `${chapternumber}`
    });

    fs.writeFileSync('./bot-manga.json', JSON.stringify(file, null, 2), 'utf-8', err => {
        if(err) throw err;
        console.log(JSON.stringify(file));
        console.log('writing to' + fileName)
    })






    }
}


