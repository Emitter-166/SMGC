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
        if(!msg.content.toLowerCase().startsWith('.s')) return;

        let args = msg.content.split(" ");
        args.shift();

        let msg_to_send = "✉️ **Anonymous: **" + args.join(" ");


        let channel = await client.channels.fetch(process.env.CHANNEL_ID);

        if(!channel) return;

        await channel.send({
            content: msg_to_send
        })
    }catch(err){
        console.log("Err on /src/index.js");
        console.log(err);
    }
})

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