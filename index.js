const path = require('path');
const {Client} = require('discord.js-selfbot-v13');

require('dotenv').config({
    path: path.join(__dirname, ".env")
})


const client = new Client({
    intents: ['GUILDS', 'MESSAGE_CONTENT', 'GUILD_MESSAGES']
})


client.once('ready', async (client) => {
    console.log("ready");
})

client.on('messageDelete', async msg => {
    try{
        if(msg.channel.type !== "DM") return;

        let args = msg.content.split(" ");
        let cmd = args.shift().toLowerCase();

        let channel = await client.channels.fetch(process.env.CHANNEL_ID);
        if(!channel) return;

        if(cmd === '.s' || cmd === '.sr') {
            let msgId = cmd === '.sr' ? args.shift() : null;
            let msg_to_send = "✉️ **Anonymous: **" + args.join(" ");
            let message = msgId ? await channel.messages.fetch(msgId) : await channel.send({ content: msg_to_send });
            if(cmd === '.sr') await message.reply({ content: msg_to_send });
        } else if(cmd === '.sreacc') {
            let msgId = args.shift();
            let emoji = args.shift();
            let message = await channel.messages.fetch(msgId);
            if(message) await message.react(emoji);
        } else if(cmd === '.se') {
            let msgId = args.shift();
            let newContent = "✉️ **Anonymous: **" + args.join(" ");
            let message = await channel.messages.fetch(msgId);
            if(message) await message.edit({ content: newContent });
        } else if(cmd === '.sd') {
            let msgId = args.shift();
            let message = await channel.messages.fetch(msgId);
            if(message) await message.delete();
        } 
    }catch(err){
        console.log("Err on /src/index.js");
        console.log(err);
    }
});

client.login(process.env.SELF_TOKEN)


const errHandler = async (err, msg) => {
    try{
        const s = '```';
        const text = `## An err occurred! \n\n ${s+err+s}`;
        await msg.reply({
            content: text
        })
    }catch(err){
        console.log("Err on /src/errHandler()");
        console.log(err);
    }
}