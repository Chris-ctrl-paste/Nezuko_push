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
const { MessageEmbed } = require('discord.js');

const path = require('path')

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
                client.users.cache.get('129731646114103296').send(`Error New Stream: ${err} - ${statusMessages} `)
            }


            console.log(statusMessages)


            return;
        } else
            return;
    }
});





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
    follow: '987978757,  550017684, 1129432086287245318 ',
});

stream.on('tweet', tweet => {
    if (tweet.retweeted_status
        || tweet.in_reply_to_status_id
        || tweet.in_reply_to_status_id_str
        || tweet.in_reply_to_user_id
        || tweet.in_reply_to_user_id_str
        || tweet.in_reply_to_screen_name)
        return true

    if(!tweet.entities.media) return;     

    const twitterMessage = ` https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    client.channels.cache.get(dest).send(twitterMessage);
    return false;
});




// const Twitter = require('twit');


const twitterConfig = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret:  process.env.CONSUMER_SECRET,
    access_token:  process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
}

const twitterClientLikeComment = new Twitter(twitterConfig);

//this is working for automatical like/retweet/comment
const LikeTweet = twitterClientLikeComment.stream('statuses/filter', {
    follow: '1508165512567603201, 769124611179020288, 1306489075495571459, 1312902815493357568, 723343731055820800, 2462688913, 2794384695'
    
});

// LIKING A TWEET CODE BELOW
LikeTweet.on('tweet', tweet => {
    if (tweet.retweeted_status
        || tweet.in_reply_to_status_id
        || tweet.in_reply_to_status_id_str
        || tweet.in_reply_to_user_id
        || tweet.in_reply_to_user_id_str
        || tweet.in_reply_to_screen_name)
        return true
    
    
    twitterClientLikeComment.post('favorites/create', { id: `${tweet.id_str}` }, function (err, data, response) {

    
    console.log(err)
    console.log("successfully liked tweet")
  })


// --------------


// ALL THE GIFS MOHAHAH



//  ------

// random quote 
const jsonQuotes = fs.readFileSync(
    'resources/quotes/motivational.json',
    'utf8'
  );
  const quoteArray = JSON.parse(jsonQuotes).quotes;
  
  const randomQuote =
    quoteArray[Math.floor(Math.random() * quoteArray.length)];
  


let files = fs.readdirSync('./resources/gifs').filter(file=>file.endsWith('.gif'))
        
let chosenFile = files[Math.floor(Math.random() * files.length)] 
    
const b64content = fs.readFileSync(path.join('resources/gifs', chosenFile), { encoding: 'base64' })
// first we must post the media to Twitter
twitterClientLikeComment.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and
  // other text-based presentations and interpreters
  const mediaIdStr = data.media_id_string
  const altText = "Beep Boop, Hugs!"
  const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
 
  twitterClientLikeComment.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet)
      const params = { 
        
        status: `${randomQuote.text + " -" + randomQuote.author} @`  + tweet.user.screen_name + '!',
        in_reply_to_status_id: '' + tweet.id_str,
        media_ids: [mediaIdStr],
       
    }
        
      twitterClientLikeComment.post('statuses/update',  params,  function (err, data, response) {
        console.log(err)
        console.log(data)
        console.log("picture successfully sent")
      })
    }
  })
})

});
// ------------------------- tweet like comment code ends here
















client.on('message', function (message) {

    if (message.author.bot) return;

    // const msg = message.content.toLowerCase();


   
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





const perspective = require('./perspective/perspective');

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




    return (users[userid]['TOXICITY'] > Math.floor(Math.random()));


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






let image = ["./resources/images/nez1.jpg", "./resources/images/nez2.jpg", "./resources/images/nez3.jph", "./resources/images/nez4.jpg", 
"./resources/images/nez5.jpg", "./resources/images/nez6.jpg", "./resources/images/nez7.jpg", "./resources/images/nez8.jpg", 
"./resources/images/nez9.jpg", 
]

function change() {
    let random = image[Math.floor(Math.random() * image.length)]
    client.user.setAvatar(random)
}


setInterval(function () {
    // Invoke function every 10 minutes

    change()
    console.log("changed profile picture")

},625000)






client.login(token);