const Timeout = new Set();
const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../botconfig.json')
const ms = require('ms')
const language = require('../../google/langOptions');
const translate = require('@vitalets/google-translate-api');
const speech = require('../../google/messages');
const fs = require("fs");
const Discord = require("discord.js");






module.exports = async (bot, message) => {


 
    

  





    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    // if (!message.member) message.member = await message.guild.fetchMember(message);
    // if (!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    // if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) {
        const timeout = parseInt(command.timeout);
        if (Timeout.has(`${message.author.id}${command.name}`)) {
            return message.reply(`**Slow down, you can only use this command every ${ms(timeout)}!**`)
        } else {

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




            command.run(bot, message, args);
            Timeout.add(`${message.author.id}${command.name}`)
            setTimeout(() => {
                Timeout.delete(`${message.author.id}${command.name}`)
            }, timeout);
        }

    }


    // GOOOGLE TRANSLATE HERE BELOW READ THIS!!!........

    // Auto-translates the text into the command's language like !japanese, or !french
    if (language.some(ele => ele.name === cmd)) {

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




        if (args.length === 0) {
            message.reply(speech.BOT_FULLNAME_AUTO_ERROR);
        } else {
            let lang_to = language.filter(ele => ele.name === cmd)[0].abrv;
            let text = args.slice(0).join(' ');
            translate(text, { to: lang_to })
                .then(res => message.channel.send(res.text))
                .catch(err => message.channel.send(speech.BOT_TRANSLATION_ERROR + err));
        }
    }

    // Auto translates with abbreviation like !ko, !en, or !de
    if (language.some(ele => ele.abrv === cmd)) {


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







        if (args.length === 0) {
            message.reply(speech.BOT_ABBR_AUTO_ERROR);
        } else {
            let lang_to = language.filter(ele => ele.abrv === cmd)[0].abrv;
            let text = args.slice(0).join(' ');
            translate(text, { to: lang_to })
                .then(res => message.channel.send(res.text))
                .catch(err => message.channel.send(speech.BOT_TRANSLATION_ERROR + err));
        }
    }








}













