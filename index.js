const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
    // disableEveryone: true,
});
const config = require("./botconfig.json");
const token = config.token;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.prefix = config.prefix;
const NekosLifeAPI = require('nekos.life');
client.nekoslife = new NekosLifeAPI();
const { MessageEmbed } = require('discord.js');


require('dotenv').config();

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});




//THIS STORES THE MESSAGES!
const statusMessages = {};


client.on('presenceUpdate', async (oldMember, newMember) => {

    if (!oldMember) {
        return;
    }
    const streamChannel = client.channels.cache.get("776198796182290472")
    if (!streamChannel) return console.error("Channel not found")

    const member = newMember.member

    const stopStreamingStatus = newMember.activities.find(activity => activity.type === 'STREAMING') ? false : false;
    const oldStreamingStatus = oldMember.activities.find(activity => activity.type === 'STREAMING') ? true : false;
    const newStreamingStatus = newMember.activities.find(activity => activity.type === 'STREAMING') ? true : false;





    if (oldStreamingStatus == newStreamingStatus) {
        return;
    }

// THIS IS WHEN THEY STOP STREAMING AND NEZUKO DELETES IT!
    if (newStreamingStatus == stopStreamingStatus) {

        const streamChannel = client.channels.cache.get("776198796182290472")
        if (!streamChannel) return console.error('Unable to find welcome channel.');

        try {

            const message = await streamChannel.messages.fetch(statusMessages[member.guild.id][member.id]);
            if (!message) return;
            await message.delete();
            delete statusMessages[member.guild.id][member.id];

        } catch (err) {
            console.error(err)
        }
    }

// THIS IS WHEN PEOPLE START STREAMING NEZUKO SENDS MESSAGE.
    if (newStreamingStatus) {
        if (newMember.member.roles.cache.some(r => ["Raider", "Trial", "Officer", "Hiroshi"].includes(r.name))) {


            const activity = newMember.activities.find(activity => activity.type === 'STREAMING')

            try {
                const message = await streamChannel.send(`Hey! <${activity.url}> is streaming!`)


                if (!statusMessages[member.guild.id]) statusMessages[member.guild.id] = {};
                statusMessages[member.guild.id][member.id] = message.id


            } catch (err) {
                console.error("sending message fail", err)
            }


            console.log(statusMessages)


            return;
        } else
            return;
    }
});



/**
 * Error handler
 *
 * @param channel the text channel to send the message to
 * @param err the error message to log
 */
async function onError(channel, err) {

    console.log(err);
    await channel.send("Looks like even I forget things, like how to do what you just asked. Please ask me again later.");
}

const Scheduler = require('./database/reminder/scheduler');

let scheduler = new Scheduler(client);

client.on('message', async (message) => {

let file = fs.readFileSync('./bannedIDs.json')
let bannedIDs = JSON.parse(file).ids || []


let blacklist = new Discord.MessageEmbed()
    .setColor("#e31212")
    .setDescription(
      "You have been automatically blacklisted."
    );
    // ID or ID(s) of user you wish to blacklist here
    if (bannedIDs.includes(message.author.id))
   	   return; 





try {

    // the bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 1) == '!') {

        

        let messageContent = message.content.substring(1);
        let command = messageContent.split(' ')[0];
        let parameters = messageContent.substring(messageContent.indexOf(' ') + 1);

        switch (command) {

            
            case 'rmind':
                await scheduler.setReminder(message.author.id, message.channel, parameters);
                break;

            case 'clearall':
                await scheduler.clearActiveReminders(message.author.id, message.channel);
                break;

            case 'forgetme':
                await scheduler.clearAllReminders(message.author.id, message.channel);
                break;
        }
    }
}
catch (err) {

    onError(message.channel, err);
}
})


const schedule = require('node-schedule');
const request = require('node-superfetch');


const OAuth = require('oauth');


const twitter_application_consumer_key = process.env.CONSUMER_KEY ;  // API Key
const twitter_application_secret = process.env.CONSUMER_SECRET ;  // API Secret
const twitter_user_access_token = process.env.ACCESS_TOKEN ;  // Access Token
const twitter_user_secret = process.env.ACCESS_TOKEN_SECRET;  // Access Token Secret


const oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	twitter_application_consumer_key,
	twitter_application_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
);


async function twitterCall() {
try {
    const { text } = await request.get(`http://history.muffinlabs.com/date`);
    const body = JSON.parse(text);
    const events = body.data.Events;
    const event = events[Math.floor(Math.random() * events.length)];


    const status = `${"On This Day: " + body.date + " " + event.year}\n${event.text}`  // This is the tweet (ie status)


    const postBody = {
        'status': status
    };
    



// console.log('Ready to Tweet article:\n\t', postBody.status);
oauth.post('https://api.twitter.com/1.1/statuses/update.json',
twitter_user_access_token,  // oauth_token (user access token)
twitter_user_secret,  // oauth_secret (user secret)
    postBody,  // post body
    '',  // post content type ?
	function(err, data, res) {
		if (err) {
			console.log(err);
		} else {
			// console.log(data);
		}
	});


    
} catch(err) {
 console.log(err)
}

}







// */5 * * * *   
const j = schedule.scheduleJob("0 18 * * *", function() {
    twitterCall()
        console.log('This runs every 18:00');

})









const Twitter = require('twit');
const twitterConf = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret:  process.env.CONSUMER_SECRET,
    access_token:  process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
}

const twitterClient = new Twitter(twitterConf);
// Specify destination channel ID below
const dest = '759453597142089729';

// Create a stream to follow tweets
const stream = twitterClient.stream('statuses/filter', {
    follow: '1283657064410017793, 987978757,  1077382642411204608',
});

stream.on('tweet', tweet => {
    if (tweet.retweeted_status
        || tweet.in_reply_to_status_id
        || tweet.in_reply_to_status_id_str
        || tweet.in_reply_to_user_id
        || tweet.in_reply_to_user_id_str
        || tweet.in_reply_to_screen_name)
        return true


    const twitterMessage = ` https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    client.channels.cache.get(dest).send(twitterMessage);
    return false;
});


















































client.on('message', function (message) {

    if (message.author.bot) return;

    msg = message.content.toLowerCase();


   
    if(message.channel.type === 'dm')  {

        client.channels.cache.get('812352794542735400').send(`${message.author.username} said: ${message}`)
    
    }

    //mention hiroshi
    if (message.mentions.users.get("129731646114103296")) {
        client.users.cache.get('129731646114103296').send(`${message.author} said: ${message} `)
            .catch(console.error)
    }


    //mention hiroshi
    if (message.content.toLowerCase().includes("hiroshi")) {
        client.users.cache.get('129731646114103296').send(`${message.author} said: ${message} `)
            .catch(console.error)
    }

})













const perspective = require('./events/guild/lang/perspective');

require('dotenv').config();


/**
 * Analyzes a user's message for attribues
 * and reacts to it.
 * @param {string} message - message the user sent
 * @return {bool} shouldKick - whether or not we should
 * kick the users
 */
const users = {};

/**
 * Kick bad members out of the guild
 * @param {user} user - user to kick
 * @param {guild} guild - guild to kick user from
 */



async function kickBaddie(user, guild) {

  userID = user.id
  if(userID) {
  
      let file = fs.readFileSync('./bannedIDs.json')
      let bannedIDs = JSON.parse(file).ids || []
  
      if (!bannedIDs.includes(userID)) bannedIDs.push(userID)
     
          fs.writeFileSync('./bannedIDs.json', JSON.stringify({ ids: bannedIDs }))
          
          // message.channel.send('added to the list')
          console.log("added to blacklist")
  
  } 
}

async function evaluateMessage(message) {
    const emojiMap = {
        'FLIRTATION': ` ${client.emojis.cache.get("771085308409938010")}  `,
        'TOXICITY': ` ${client.emojis.cache.get("771084962585378897")}`,
        
        
    };





  

/**
 * Analyzes a user's message for attribues
 * and reacts to it.
 * @param {string} message - message the user sent
 * @return {bool} shouldKick - whether or not we should
 * kick the users
 */






    let scores;
    try {
        scores = await perspective.analyzeText(message.content);
    } catch (err) {
        console.log(err);
        return false;
    }

    const userid = message.author.id;

    if (message.mentions.has(client.user)) {

        let file = fs.readFileSync('./bannedIDs.json')
        let bannedIDs = JSON.parse(file).ids || []
    
    
        let blacklist = new Discord.MessageEmbed()
        .setColor("#e31212")
        .setDescription(
          "You have been automatically blacklisted."
        );
      // ID or ID(s) of user you wish to blacklist here
      if (bannedIDs.includes(message.author.id))
        return message.channel.send(blacklist);

//blacklist ends

        for (const attribute in emojiMap) {

            if (scores[attribute]) {
                // message.author.send(emojiMap[attribute])
                message.channel.send(emojiMap[attribute]);
                users[userid][attribute] =
                    users[userid][attribute] ?
                        users[userid][attribute] + 1 : 1;
                break;
            }
        }
    }

    if (message.content.toLowerCase().includes("nezuko")) {
        let file = fs.readFileSync('./bannedIDs.json')
        let bannedIDs = JSON.parse(file).ids || []
    
    
        let blacklist = new Discord.MessageEmbed()
        .setColor("#e31212")
        .setDescription(
          "You have been automatically blacklisted."
        );
      // ID or ID(s) of user you wish to blacklist here
      if (bannedIDs.includes(message.author.id))
        return message.channel.send(blacklist);


          //blacklist ends

        for (const attribute in emojiMap) {
            if (scores[attribute]) {
                message.channel.send(emojiMap[attribute]);
                users[userid][attribute] =
                users[userid][attribute] ?
                    users[userid][attribute] + 1 : 1;
            break;
               
            }
        }
    }




    return (users[userid]['TOXICITY'] > Math.floor(Math.random() * 5) + 1);


}

/**
 * Writes current user scores to the channel
 * 
 */



client.on('message', async (message) => {


    if (!message.guild || message.author.bot) return;

    const userid = message.author.id;
    if (!users[userid]) {
        users[userid] = [];
    }

    
    let shouldKick = false;
    try {
        
       
        shouldKick = await evaluateMessage(message);
    } catch (err) {
        console.log(err);
    }

    if (shouldKick) {

      let file = fs.readFileSync('./bannedIDs.json')
      let bannedIDs = JSON.parse(file).ids || []
  
      if (bannedIDs.includes(userid)) return;


      kickBaddie(message.author, message.guild);
      delete users[message.author.id];
      // console.log("you have been added to blacklist")
      return;
    }


});


const axios = require('axios');


async function earthquake(message) {

 
    const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson';
    let response, data;
    try {
        response = await axios.get(url);
        
        data = response.data;
      
       
    } catch (e) {
        return message.channel.send(`An error occured!`)
    }


    if(data.metadata.count === 0) {
        return console.log("No quakes")
    }




    const embed = new MessageEmbed()

    const earth = data.features


    let fields = [];


    let f = fs.readFileSync('./earthquakeid.json')
    let eq = JSON.parse(f).features || []

    const removeArray = eq


    earth.forEach((earths) => {
        
        let someArray= [
            earths
           
          ];
          removeArray.filter(function(ra) {
              someArray = someArray.filter(function(obj) {
                  return !this.has(obj.id);
                }, new Set(removeArray.map(obj => obj.id)))
          });
          
          

        



          someArray.forEach((s) => {


           

            let field = {
                name: s.properties.place + "\n",
                value: "" + "\n",

            };

            if (s !== undefined) {
                // field.value += earths.properties.place + "\n";
                field.value += s.properties.mag + " Magnitude" + "\n";
                field.value += s.properties.tsunami + " Tsunami" + "\n";
                

            }


            let d = fs.readFileSync('./earthquakeid.json')
        
            let dd = JSON.parse(d)
            dd["features"].push({"id":`${s.id}`});
            let test = JSON.stringify(dd, null, " ");
    
         
    
           
          

            fields.push(field);


            
             

              fs.writeFile("earthquakeid.json", test, function(err) {
                if (err) {
                    console.log(err);
                }
            });
               
            })
            
          
             

        
  

        
    })
    
    if (!Array.isArray(fields) || !fields.length) 
            return  console.log("No new Quakes yet.")
       

    embed.fields = fields;
    // message.channel.send(embed)
    client.channels.cache.get('812372315471740948').send(embed)
    client.users.cache.get("129731646114103296").send(embed)
}



// 0 * * * *
// * * * * *
var CronJob = require('cron').CronJob;
var job = new CronJob('0 * * * *', function() {
  console.log('You will see this every hour');
  earthquake()
}, null, true, 'America/Los_Angeles');
job.start();











client.login(token);