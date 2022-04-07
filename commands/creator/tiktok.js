const TikTokScraper = require('tiktok-scraper');
const got = require('got');
const fs = require('fs')


module.exports = {
    name: "tiktok",
    category: "creator",
    run: async (client, message, args) => {

        if (message.author.id !== '129731646114103296')
            // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
          
              const headers = {
                "User-Agent": "BOB",
                "Referer": "https://www.tiktok.com/",
                "Cookie": "tt_webid_v2=BOB"
              }
            
              
              const videoMeta = await TikTokScraper.getVideoMeta(`${args}`, headers);
            //   console.log(JSON.stringify(videoMeta, null, 2))
              
              const url = videoMeta.collector[0].videoUrl
              console.log(url)
              got
                .stream(url, { headers: videoMeta.headers })
                .pipe(fs.createWriteStream(`./resources/tiktok/tiktokvideo.mp4`));
                await new Promise(resolve => setTimeout(resolve, 3000));
                message.channel.send({
                    files:[
                        "./resources/tiktok/tiktokvideo.mp4"
                        
                    ]
                })
               
            }

 }
