const fs = require('fs');
const manga_url = process.env.MANGA_URL;
const { getMangaListOfChapters } = require('./scraper');
const { compare } = require('./utility');


module.exports = {
    name: "mfetch",
    category: "manga-tracker",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
            

          
            
           
                const mangaReadingList = getMangaReadingList();
                console.log("Checking")
                const messageRef = await message.channel.send("Checking")

            
                const mangaWithChapters = await getMangaListOfChapters(manga_url, mangaReadingList);
                const compareResults = await compare(mangaReadingList, mangaWithChapters);

                

            
                for(const manga of compareResults) {
                    if (manga.status === "NO_UPDATE") {
                        console.log(`No new chapter found`);
                        messageRef.edit("No new chapters has been released - Unfortunate.")
                    } else {
                        console.log(`${manga.name} - New ${manga.latest_chapter} ! Please go read now!`);
                        messageRef.delete({timeout: 1000})
                        message.channel.send(`New ${manga.latest_chapter}  ${manga_url}${manga.name}! Please go read now!`)
                    }
                }
            
                function getMangaReadingList() {
                    const rawdata = fs.readFileSync('./bot-manga.json');
                    let currentReading = JSON.parse(rawdata);
                    console.log(currentReading)
                    return currentReading;
                }
            
            
 


            
    }
}


