require("dotenv").config()
const Discord = require('discord.js');
const tokensString = process.env.token || '';
const token = tokensString.split(' ')




const intents = new Discord.Intents([
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MEMBERS,
  Discord.Intents.FLAGS.GUILD_MESSAGES,
]);

const client = new Discord.Client({ intents });

client.once('ready', async() => {
  console.log('Bot is ready.');
});

client.on('message', async (message) => {
  let currentTokenIndex = 0;
  let messageCount = 0;
 
    if (message.content.startsWith('!dm')) { 
      if (message.member.permissions.has('ADMINISTRATOR')) {
        try {
          const guild = message.guild;
          const members = await guild.members.fetch();
          const content = message.content.substring('!dm'.length).trim(); 

          const attachment = message.attachments.first();
          const image = attachment ? attachment.url : null;
          const newGuild = await client.guilds.fetch(guild.id);
          if (newGuild) {

      

    try {
      await newGuild.members.fetch({ force: true }); 
 
      for (const [memberId, member] of newGuild.members.cache) {
        if (!member.user.bot && memberId !== client.user.id) {
          try {
            const options = { 
              content: `Hey ${member}, \n\n **XD BYPASS** \n\n  **${content}** \n\n`,
              components: [
                new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setLabel('Discord')
                        .setURL('https://discord.gg/pcqtAXyzAm')
                        .setStyle('LINK')
                ),
                new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setLabel('Buy')
                        .setURL('https://www.xdcheats.com/')
                        .setStyle('LINK')
                ),
                new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setLabel('Telegram')
                        .setURL('https://t.me/xdbypass')
                        .setStyle('LINK')
                ),
              ],
            };
            if (image) {
                options.files = [image];
            }

            await member.send(options);
            message.reply(`Sent DM to ${member.user.tag}`);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay between messages

            messageCount++;
            if (messageCount >= 45) {
                 ++currentTokenIndex // Move to the next token
              if (currentTokenIndex < token.length) {
                //  currentToken = token[currentTokenIndex];
                  client.login(token[currentTokenIndex]); // Log in with the new token
                  messageCount = 0; // Reset the message count
              } else {
                  message.reply('All tokens used.');
                  break; // No more tokens available
              }
          }

          } catch (error) {
            message.reply(`Failed to send DM to ${member.user.tag}: ${error}`); 
          }
        }
      }

      message.reply(`Total members: ${newGuild.members.cache.size}`);
    } catch (error) {
      message.reply('Error fetching members:', error);
    }
  } else {
    message.reply('Guild not found.');
  }

          
    
  
          message.reply('Successfully Dm all Users');
        } catch (error) {
            message.reply('Error fetching members:', error);
        }
      } else {
        message.reply('You do not have permission to use this command.');
      }
    }
  });

client.login(token[0]);