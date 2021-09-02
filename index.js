const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('ODgxMTQ4OTc5MzczNTU1NzYz.YSon7w.wi-RrDW_Twxw2kjO3I9GMtZkGlg');
client.commands = new Collection();
client.setMaxListeners(0);
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

//this fires when the BOT STARTS DO NOT TOUCH
client.on(`ready`, () => {	
//////////////

////////
   
   ///////////////////////////////
    ////////////IFCHEMPTY//////////
        //remove everything in between those 2 big comments if you want to disable that the bot leaves when ch. or queue gets empty!
        setInterval(() => { 
          let member;
        client.guilds.cache.forEach(async guild =>{
        await delay(15);
          member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
        //if not connected
          if(!member.voice.channel)
          return;
        //if alone 
        if (member.voice.channel.members.size === 1) 
        { return member.voice.channel.leave(); }
      });
      

    client.user.setActivity(`${PREFIX}help Moon Light`, { type: "LISTENING"});

    client.user.setActivity(`${client.guilds.cache.size} Server,Users ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)},`, { type: "LISTENING"});
   
  
      }, (5000));
      ////////////////////////////////
      ////////////////////////////////
    figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {
          console.log('Something went wrong');
          console.dir(err);
      }
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
      console.log(data)
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })
   
});
//DO NOT TOUCH
//FOLDERS:
//Admin custommsg data FUN General Music NSFW others
commandFiles = readdirSync(join(__dirname, `Music`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Music`, `${file}`));
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `others`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `others`, `${file}`));
  client.commands.set(command.name, command);
}
//COMMANDS //DO NOT TOUCH
client.on(`message`, async (message) => {
  if (message.author.bot) return;
  
  //getting prefix 
  let prefix = await db.get(`prefix_${message.guild.id}`)
  //if not prefix set it to standard prefix in the config.json file
  if(prefix === null) prefix = PREFIX;

  //information message when the bot has been tagged
  if(message.content.includes(client.user.id)) {
    message.reply(new Discord.MessageEmbed().setColor("#FF0000").setAuthor(`${message.author.username}, My Prefix is ${prefix}, to get started; type ${prefix}help`, message.author.displayAvatarURL({dynamic:true})));
  } 
  //An embed announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}embed`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription(saymsg)
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }

//An about announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}about`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setAuthor("About Moon Light.", "https://media.discordapp.net/attachments/853738123100291133/881541545428418630/PicsArt_08-29-05.01.58.png")
    .setThumbnail(`https://cdn.discordapp.com/avatars/819568672250396702/69aa4e385fc3acf5228c9bc92d859023.webp`)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`

[Support](https://discord.gg/dC8tuEczZb) - [Invite](https://discord.com/api/oauth2/authorize?client_id=881158768983957545&permissions=8&scope=bot)

**<a:tangsor:840818995079020565> Owner Bot** :
<@852951034270711859>

**<a:emoji_55:827801709295828992> Set Status** :
Online

**<a:sahat:827565115083718668> Time Create** :
4/2/2021

**<a:emoji_18:818844275750993940> Prefix Bot** :
    @

`)

    //send the Message
    message.channel.send(embed)
   message.react("<a:emoji_37:823489934622064700>")
  } 


//An suuport announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}support`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription (`
    <a:zeko:837426841408110653> Links

<a:emoji_19:818845027438166026> [Support](https://discord.gg/dC8tuEczZb)

<a:emoji_18:818844275750993940> [Invite](https://discord.com/api/oauth2/authorize?client_id=881158768983957545&permissions=8&scope=bot)`)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setImage(``)
    .setTitle(`**__SUPPOT __**`) 
    .setThumbnail(`https://media.discordapp.net/attachments/853738123100291133/881541545428418630/PicsArt_08-29-05.01.58.png`)
    .setTimestamp()
    
    //send the Message
    message.channel.send(embed)
   message.react("<a:emoji_37:823489934622064700>")
  } 
   
//An cv announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}cv`)){
    //define saymsg
     if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setAuthor(`${message.guild.name}`,message.guild.iconURL({ dynamic: true }))
    .setDescription(saymsg)
    .setTimestamp()
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  } 
   

//command Handler DO NOT TOUCH
 const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
 if (!prefixRegex.test(message.content)) return;
 const [, matchedPrefix] = message.content.match(prefixRegex);
 const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
 const commandName = args.shift().toLowerCase();
 const command =
   client.commands.get(commandName) ||
   client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
 if (!command) return;
 if (!cooldowns.has(command.name)) {
   cooldowns.set(command.name, new Collection());
 }
 const now = Date.now();
 const timestamps = cooldowns.get(command.name);
 const cooldownAmount = (command.cooldown || 1) * 1000;
 if (timestamps.has(message.author.id)) {
   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   if (now < expirationTime) {
     const timeLeft = (expirationTime - now) / 1000;
     return message.reply(
      new MessageEmbed().setColor("#FF0000")
      .setTitle(`<a:wit_23:818858098906759220> \`Please wait ${timeLeft.toFixed(1)} seconds before reusing the ${prefix}${command.name}\`!`)    
     );
   }
 }
 timestamps.set(message.author.id, now);
 setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 try {
   command.execute(message, args, client);
 } catch (error) {
   console.error(error);
   message.reply( new MessageEmbed().setColor("#FF0000")
   .setTitle(`<a:emoji_20:818845772878446632> There was an error executing that command.`)).catch(console.error);
 }


});

client.on("guildCreate", guild => {
  let channel = client.channels.cache.get("843177720996298772");
  let embed = new MessageEmbed().setColor("#FF0000")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `✅ Join Server`)
  .addField(" **Server Name**", `${guild.name}`)
  .addField(" **Server Owner**", `${guild.owner}`)
  .addField(" **Server Id**", `${guild.id}`)
  .addField(" **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("guildDelete", guild => {
  let channel = client.channels.cache.get("843177756958654515");
  let embed = new MessageEmbed()
  .setColor("#FF0000")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `❌ Left Server`)
  .addField(" **Server Name**", `${guild.name}`)
  .addField(" **Server Owner**", `${guild.owner}`)
  .addField(" **Server Id**", `${guild.id}`)
  .addField(" **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "girl")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711473652563968/836004014411743242/image0-18.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/834099338597761094/image0.gif",
      "https://cdn.discordapp.com/attachments/806998445390299146/825099198226759721/image0_4.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/836002001241767976/image0-7.gif",
      "https://cdn.discordapp.com/attachments/806998445390299146/825099000091902012/image0-2_4.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/836001626258669618/Arda335.gif",
      "https://cdn.discordapp.com/attachments/836423956965097493/836719268791582820/a_9c175586024b79314d21aca9ae3786b9.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/835985659583922206/a_ad2ddd1f0f1452d360556621b149317c.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/833857621990965248/pp_gif1.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/833857592102617188/ffea450eb5d1182f344c7f5d82ff0d24.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/827656133237407744/GIF__.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/833857547726356500/fav3.gif",
      "https://cdn.discordapp.com/attachments/836423956965097493/836720560946937856/2_19.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/835966804723105832/a_3eca0f7a9e8d4ca211d591981e6b00f6.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/835970053865734164/44.gif",
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Girl**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "boy")) {
    let man = [
      "https://cdn.discordapp.com/attachments/806998445390299146/825099107546562580/image1-1.gif",
      "https://cdn.discordapp.com/attachments/806998445390299146/825099038328094740/image0-3_2.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833728824155439124/52.gif",
      "https://cdn.discordapp.com/attachments/694693923486171177/737219168822362183/a_9c8d6cb51559b033674ed8dd16234ee7.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833702045542252566/33.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833701966566653962/02.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/831991990669410364/a_1117ca8c28ea3a9245d94a532ba8f9d6.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/827674509963821097/image1.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/834337508703600641/image0.gif",
      "https://cdn.discordapp.com/attachments/694693923486171177/737105973155463259/gif_180.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833695252695089172/a_0ef2b749b8ab3dd543d8899b29750ed5.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833682771993559040/gif_1.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833668804025778196/erkeks_88.gif",
      "https://cdn.discordapp.com/attachments/806591479677321246/820961262585249832/image2.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/822913380170858517/image3.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Boy**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "baby")) {
    let man = [
      "https://cdn.discordapp.com/attachments/699339066029768796/835767204883464192/unnamed_4.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/833798411924537375/taki_babygif46.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/833798372321525790/image6.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/833798365161717821/hawli.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/833798349269762078/baby29.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/834010510243659806/laius_40.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/835105000110686238/a_f2e76c2a21a60d70b92db788fb9abc2a.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/835766717321707560/image0-4.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/835766811856470046/luisa_5.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/833521958405537792/795739811981951046-1.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/835766843477327872/taerragif2.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/833521861504925747/image0_23.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/830566450749898803/ED96CB49-EF08-4F6E-970C-4E18556EADB6.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/830566227637174302/image0-5.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/830516512375832586/a_65e66eac699639f1eb8ef709e56e1447.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Baby**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "neon")) {
    let man = [
      "https://cdn.discordapp.com/attachments/755890505681731714/833797136809197668/32.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797128920236132/15.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797113057116200/selishaneongif.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797121579679804/0_320.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797117952524298/Zenard_14.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797099027562546/Neon_3.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797093277696020/neon.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797087106826270/n3.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797085832413244/image0.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797070468153414/hawl.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797065683238942/HYpeREmir_5.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797031529152542/a_416ef6de4c38f68792ce116efde8be06.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797008288120942/a_284ca68d1c3c530465e88202bbadb2f1.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833797002185146398/a_66ab0c0313ebdde9674f6c2801bab937.gif",
      "https://cdn.discordapp.com/attachments/755890505681731714/833719373956907028/image0.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Neon**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "couple")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711480346542102/833799513860341760/okeyy.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833754931856670761/a_637b8e2042d540a1e5e28282e3fe5cc7.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833696742486048829/4.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668446457167921/couple_gif_3.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668445022978108/couple_gif_2.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668414061019136/couple_gif_4.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668402835881984/couple_gif_5.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668385908850728/couple_gif_6.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668363346509834/couple_gif_9.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668316911894598/couple_gif_11.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668283676622889/couple_gif_14.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668248263983124/couple_gif_17.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668231071399967/couple_gif_18.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668209889771570/couple_gif_20.gif",
      "https://cdn.discordapp.com/attachments/608711480346542102/833668197223366666/couple_gif_21.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Couple**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "smoke")) {
    let man = [
      "https://cdn.discordapp.com/attachments/755893014915711047/834400043750260756/image4.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/834400043309334548/image3.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/834400042592894996/image0.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/828322024979300352/Sigara4.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/827981137532026900/DDF16B8F-033E-43E7-9E35-72633005A645.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/827982589255090297/Alkolik_Hayalet_54.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/827980878558789692/image2_1.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/827979949326598156/gifpp.gif",
      "https://cdn.discordapp.com/attachments/755893530429489192/834152189680943144/image0.gif",
      "https://cdn.discordapp.com/attachments/755893530429489192/834060512551108628/image0.gif",
      "https://cdn.discordapp.com/attachments/755893530429489192/828343256710512670/hit_gif_42.gif",
      "https://cdn.discordapp.com/attachments/755893530429489192/828343778405646356/image0-1.gif",
      "https://cdn.discordapp.com/attachments/755893530429489192/827583592057012274/tenor-1.gif",
      "https://cdn.discordapp.com/attachments/755893530429489192/827045452998115338/taerrasmoke5.gif",
      "https://cdn.discordapp.com/attachments/755893530429489192/827043893173944320/19.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Smoke**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "anime")) {
    let man = [
      "https://cdn.discordapp.com/attachments/806998445390299146/825099121202429972/received_269541241512870.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833791013683593306/anime_gif_96.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833790828328517692/anime_gif_89.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833790812214788116/anime_gif_85.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833790679787503656/anime_gif_82.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/834580561632559174/Feenx_Animes_18.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833790597001248828/anime_gif_78.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833790541803159592/anime_gif_71.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833790551295000626/anime_gif_76.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833790356335493130/anime_gif_66.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833813818584465408/a_1fee65627a13ee770a6cf684c60cbe40.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833790264337629274/anime_gif_58.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833789127475462206/anime_gif_45.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833788403778060308/anime_gif_25.gif",
      "https://cdn.discordapp.com/attachments/608711485849337856/833788464293216296/anime_gif_29.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Anime**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "bff")) {
    let man = [
      "https://cdn.discordapp.com/attachments/616157762392686593/840770709764702276/BffGif-38.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840770683490664458/BffGif-37.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840770648023760916/BffGif-35.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840770452418461696/BffGif-26.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840770410588667944/BffGif-24.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840770328552407040/BffGif-20.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840770243273687060/BffGif-16.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840770230607413268/BffGif-15.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840769933268090900/BffGif-1.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/840397794909093908/BffGif-50.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/839984399033696325/BffGif-68.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/839865780627832872/BffGif-8.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/839310577184538634/BffGif-60.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/838344775006421062/a_d3e0270cf692a226fa2d93d0615c1430.gif",
      "https://cdn.discordapp.com/attachments/616157762392686593/837449889985331210/BffGif-12.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Bff**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "bokani")) {
    let man = [
      "https://cdn.discordapp.com/attachments/793209080978210858/840835370719379456/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840835329509949450/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840835315064766524/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840835291433533471/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840835277970735114/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840832506826588200/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840832456281161728/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840832468454211584/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840832484504895488/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840832442943406090/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840832431300673536/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840832413206052895/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840832396840402984/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840828188640804864/GIF__.gif",
      "https://cdn.discordapp.com/attachments/793209080978210858/840828660461338654/dcd21e43-110f-4e18-970f-a4a0a29f11b2.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif bokani**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "man+lady")) {
    let man = [
      "https://cdn.discordapp.com/attachments/749242941607772200/841742978354774036/couple_19.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/841742971958984774/couple_18.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/841742951176208404/couple_16.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/841742959557083177/couple_17.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/841742928946397204/couple_13.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/841742923367317594/couple_12.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/840176042320330752/GIF-210507_133736.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/840176042626646026/GIF-210507_133656.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/837436018160435290/image1.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/837436017005821952/image0.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/837435922349555722/image1.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/837435921937989682/image0.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/837435665225875466/image0.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/837435665577934898/image1.gif",
      "https://cdn.discordapp.com/attachments/749242941607772200/838353952143573012/a8c74446526ab550da05d5f234556047.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif man+lady**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pboy")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711478496854019/841259035789230121/image0.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841220532002226196/f6b74269ec382023d0f8ad7a2dbc5e3e.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841220531730645002/67650b4e25d18454656c46ff5d491b92.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841220531142918164/3ac325ccb55a4502919b6928812e827e.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841220496402153502/691f8a68710e44a29dd3b335fca478c3.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841220451840819200/56714c5d9e5ccdf73586795979c7d059.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841220430710046741/67ffe4d8dffa35b230543276243b18f1.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841220398942388244/f5b173eb20e57466999363c26c4e07a6.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841220376356847656/2843e2b7f75205dcc0ec22261003bb97.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841053406117888000/12dbcf620e1dfa98bf0bda585cfee5db.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841053389651050556/cb6589a8525940cf93de9a14b887b71a.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841053360986652722/0709f7fa80c45de069750e25f6b90eae.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/841002352739745812/80ab27dda0571a8affb7100ac89a6446.jpg",
      "https://cdn.discordapp.com/attachments/608711478496854019/840997678376026142/image0.png",
      "https://cdn.discordapp.com/attachments/608711478496854019/841002352507879434/image0.jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pboy**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pgirl")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711474952798221/841263877001052180/f4c10882f69b92c266f3a07edf86ed9b.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841263874128478218/66ca6b28b845938415c0e4fadd8ebdb0.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841263855333146634/f90c669e55437e1fe30435ee67884505.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841263851445420052/294713f05aa3999db542caaccee31987.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841256024286822440/31a6d39b418000d0a1e8a21bf0ffd278.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841255087112192041/image0.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841255040811401226/image0.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841250887389020171/image0.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841250246780780614/8136cb9d43368cc0524b51a3e8714cba.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841248152941101096/image0.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841248147926024232/image0.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841248146193252402/image0.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841248100597366804/image0.png",
      "https://cdn.discordapp.com/attachments/608711474952798221/841248088755666954/image0.jpg",
      "https://cdn.discordapp.com/attachments/608711474952798221/841248092254240816/image0.jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pgirl**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pcouple")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711481969868811/841161144110284860/mix.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841161135989194752/fd.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841161127752106005/hes.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841161123540631592/vas.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841161117161357332/as.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841161111151312906/sa.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841161090406809620/x.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841161086661033984/hep.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841144840913289226/0b3eb1ef-a8a1-4e2b-a9e3-c772badd2c58.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/841127617046380564/u3me.png",
      "https://cdn.discordapp.com/attachments/608711481969868811/841010256851370054/49ebde3c5a106f9e9936af764d5b3135.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/840922913188216843/marsli.png",
      "https://cdn.discordapp.com/attachments/608711481969868811/840922891796873216/asdsad.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/840922833654775829/-.jpg",
      "https://cdn.discordapp.com/attachments/608711481969868811/840913221975015424/b2d7fd4b920ddeb589c66b26fe67cc52.png"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pcouple**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "psmoke")) {
    let man = [
      "https://cdn.discordapp.com/attachments/755893206008201357/840109487482339358/erkek_pp_2.png",
      "https://cdn.discordapp.com/attachments/755893206008201357/839693877434384414/image0.jpg",
      "https://cdn.discordapp.com/attachments/755893206008201357/838283007755288627/52bb12f4449e50f91719c928c8969556.jpg",
      "https://cdn.discordapp.com/attachments/755893206008201357/838282898737463306/b83889528701115ff1e553d517ad8d57.jpg",
      "https://cdn.discordapp.com/attachments/755893206008201357/838282860028887090/2b427088ae031b0664711c964b6d8702.jpg",
      "https://cdn.discordapp.com/attachments/755893206008201357/837801956390862898/8f78584124957819b922b80168d4911c.jpg",
      "https://cdn.discordapp.com/attachments/755893206008201357/837801909406269500/9e81defcba456a90cd3cba2fa54730ca.jpg",
      "https://cdn.discordapp.com/attachments/755893206008201357/837801925964726322/6653e6fcfcadb7ed9e5fb4e2bfd1c505.jpg",
      "https://cdn.discordapp.com/attachments/755893513723576441/839692987676098590/image0.jpg",
      "https://cdn.discordapp.com/attachments/755893513723576441/839692593386094592/image2.jpg",
      "https://cdn.discordapp.com/attachments/755893513723576441/839692593095770142/image1.jpg",
      "https://cdn.discordapp.com/attachments/755893513723576441/839692592841359390/image0.jpg",
      "https://cdn.discordapp.com/attachments/755893513723576441/838064165842845706/e2c805c08070b412011adeffaf6ebe6b.jpg",
      "https://cdn.discordapp.com/attachments/755893513723576441/836872554262167562/f8aea33b76a70a0fc3cf5e33272455b8.jpg",
      "https://cdn.discordapp.com/attachments/755893513723576441/836872542354276403/320318d1a87f52b4ce9a620ab3947a14.jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Psmoke**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pneon")) {
    let man = [
      "https://cdn.discordapp.com/attachments/755890549659140146/841046144464846858/05f36592ce0ccaace53fa36614d80cb4.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/840597676592201748/Changing_sad_-b37a639f-c022-4579-b25b-bf2297eac786.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/840597654202613780/800013069.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/840597627920711680/A_way_home-7914e591-cd7c-4bdb-b8e4-253622a9e5f9.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/840597556807335967/800007835.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/839815638172172288/pp_foto.png",
      "https://cdn.discordapp.com/attachments/755890549659140146/837707005938106428/bf385d5972ffd9a376193823d234bbe1.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/837707005543448676/ee303c75ff511d692dedf5b45da3f86d.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/837707005325213706/9ab3108920bf5d835b28f1d4ec880780.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/837335504873455696/bf3900a28758999c839b55b44713d3ec.png",
      "https://cdn.discordapp.com/attachments/755890549659140146/836300731090206840/Neon_wallpaper_by_Stone43_-_6d_-_Free_on_ZEDGETM.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/835839054976647179/c26e66fd09b40b3d7d3ce32227c89983.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/834028209028464650/b14336cc-6a18-42d5-94fb-cde0474f3c93.jpg",
      "https://cdn.discordapp.com/attachments/755890549659140146/834028069056151563/63e9e26e-b4d0-4809-aaaf-7b59b6365821.png",
      "https://cdn.discordapp.com/attachments/755890549659140146/834027967721242644/never_trust_a_hug_its_just_another_way_to_hide....jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pneon**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pbaby")) {
    let man = [
      "https://cdn.discordapp.com/attachments/699339102989844500/840567264403390526/FB_IMG_1620460050777.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/840511419325481040/Screenshot_20201227-184920-2.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/840511418683883560/7bcc69e31340ba6a6ca82e62ae55bb12.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/840511418453458964/IMG_20201214_034615.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/840511418025246724/cb4e5f69976b7bfad2bf46d726973753.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/840511417840566322/0779a1b54dfb9fee077cd73d6c26c6ff.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/840507739284701204/d9687449eb28192f630cd007a452b839.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/839822315268734996/82e1d1ce196c748165bd17d02c18a48e.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/838200277991030804/image1.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/837619268283007016/image0-2.png",
      "https://cdn.discordapp.com/attachments/699339102989844500/837619277741162556/image0-1.png",
      "https://cdn.discordapp.com/attachments/699339102989844500/836277188818894880/8f39442a96d489dc0a0cae0d302f6a34.png",
      "https://cdn.discordapp.com/attachments/699339102989844500/836277147257667658/34f1e0481cf59c0406b8a6016403dfd2.jpg",
      "https://cdn.discordapp.com/attachments/699339102989844500/836055879446167562/e16d33f65af4dfc5b04e27271860f14f.webp",
      "https://cdn.discordapp.com/attachments/699339102989844500/836029423325020210/03fab603b61166ca797a74762d497fed.jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pbaby**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "panime")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711487325995008/841259515604369438/TikTok.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841259461477138462/Red_String_End.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841258463916851250/Icon.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841256881565204480/5d242a6f550658d900dadc374ce458fa.png",
      "https://cdn.discordapp.com/attachments/608711487325995008/841256436817592330/Eri_l-army_en_TikTok.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841241980679225354/Water_Pillar.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841241754959085568/Kaneki_Ken.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841241731554738196/Tomioka_Giyuu__Icons.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841225032137965608/1c9bb209c5b8319a666c0aab32544659.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841225021459267644/0acda7804ea60956277860b2247bda26.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841225008771629056/00cf0d56216aa858e22dc4b60e868931.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841225002275176458/D.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841046683386511401/Hataraku_Saibou_icons.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841046677213151263/Hataraku_Saibou_icons_17.jpg",
      "https://cdn.discordapp.com/attachments/608711487325995008/841043196129574952/IMG_20210509_225318.jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Panime**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pbff")) {
    let man = [
      "https://cdn.discordapp.com/attachments/616157882269827102/841259000238833695/image0.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/841258989399310346/image0.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/841257125727698962/20210404_182540.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/841008585412313128/e1bd4175454407b7b51f92b1e9588eb0.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/841008566969827348/e058333fd9c135045e0353281ca6d1da.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/841008540087877632/6dad091cc1b7df3ae878be875fc3f05d.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/840603389813719080/20210416_123200.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/840603356804415518/70aac50c316bed79efa78d3ab02f3d4b.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/840509089628946442/c9f754ae059afd2840e4df1be7f839da.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/840509080953946132/9f92b8e29f5f45691f85a61d3b9401ec.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/840509087435456553/9ac3ab04afb6176ff5797555d82f5ca8.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/840509068341674004/84e9bb9c1edfe5e61dc2da44f78e6dcb.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/840509065305260092/e197a81644f991348c7f28a256cf8bcb.jpg",
      "https://cdn.discordapp.com/attachments/616157882269827102/840205988417372180/bff.png",
      "https://cdn.discordapp.com/attachments/616157882269827102/839658184989605918/4914bc21b640bdae0fe618916e35bfb4.png"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pbff**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "cartoon")) {
    let man = [
      "https://cdn.discordapp.com/attachments/755169627872428134/840674329977159741/a_0e719aef42ab05b41cf9b1bdc1929a25.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839981546751524864/Cartoon-18.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839981521782702100/Cartoon-16.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839981463079616522/Cartoon-13.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839981448450015303/Cartoon-12.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839981399326064730/Cartoon-11.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839981287552712744/Cartoon-6.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839345106535579678/b1aef910db40d4a10c1d7745a319c7ef.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839345043936772106/original_1.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839210148773363722/ALWET_GIF_154.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839210143400853575/ALWET_GIF_42.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839210132721238016/ALWET_GIF_95.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839210126853799986/ALWET_GIF_110.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839210066657280071/ALWET_GIF_73.gif",
      "https://cdn.discordapp.com/attachments/755169627872428134/839096886224355409/288a1fbdc0a6a44109a2632bd44474ab.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Cartoon**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pcartoon")) {
    let man = [
      "https://cdn.discordapp.com/attachments/755169651163529335/840918286060879941/bb19bb557c8ff76978dad08dd8eaf7fb.png",
      "https://cdn.discordapp.com/attachments/755169651163529335/840418688553451540/0e5d577bf6c7de98e4b803c93c20cb10.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/840418525813800960/279432f9cc0704f88bdde61bc0a926f4.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/840418480096542750/b98c7b6d9567ff43d7857a297b75e884.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/840418391885479986/16.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/840418338899099688/2489b7d1d1cfd32377f876c4b35ba466.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/840418313967632444/4878ef5bd511bff29efc92de938608af.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/840418285928841216/d29b1fe1dc7d48a472b58fbccd430c7e.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/839658866916589618/Tumblr_l_44825689052476.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/838628159032787009/IMG_20210503_014849_958.jpg",
      "https://cdn.discordapp.com/attachments/755169651163529335/837202652135292938/798e0ad5914bd885357f4146179212ea.png",
      "https://cdn.discordapp.com/attachments/755169651163529335/837208198829047818/Tumblr_l_214907587262670.png",
      "https://cdn.discordapp.com/attachments/755169651163529335/837207463329267743/Tumblr_l_214939951741108.png",
      "https://cdn.discordapp.com/attachments/755169651163529335/837135281684611103/Tumblr_l_208604484524755.png",
      "https://cdn.discordapp.com/attachments/755169651163529335/837135270394069012/Tumblr_l_208603155673718.png"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pcartoon**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "movies")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711494279888952/840331085714817024/f02b590556adcfaefd23f3ef7d387b26.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/840330639110832149/c2b38b626f929882e0defa2f7f7a8aa2.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/840330536508457010/ad94d14be920beb6099c172f218e51a6.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/840330486986702858/2f75dac8463770b4b02270f9337ed15f.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/840330465026113576/550bb276284fe3b032f2b2d44d61221f.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/840259690548953198/tumblr_p483yh5l3X1txl6nno1_r2_400.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/840252027241627688/PennyWise.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/840208141932298250/image3.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/840127205732515850/image0-1.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/839316321682325504/a_dc7c0738281d27b01767e50306df0183.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/838973776477159474/f0244337b41839a0ebb28daf756753e0.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/838973775738437722/6cb17d158dbb1431533a31f5762e14c3.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/838973241430900767/WarpedAdmiredCormorant-size_restricted-1.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/838738422608822293/Scarlett_Witch.gif",
      "https://cdn.discordapp.com/attachments/608711494279888952/838973016804687872/s-4b0babbce38633ef9d16de7cc837032bd75a7beb.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Movies**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pmovies")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711496041758751/840772118593404928/thor.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/839923630283423835/Tumblr_l_47757927542993.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/838783654716112956/sherlock.png",
      "https://cdn.discordapp.com/attachments/608711496041758751/838229097175580672/Tumblr_l_47755799066956.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/837644651992317972/1561999436_capturezfezfzeefzezez.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/837644629435875368/20200804witcher-vajak-henry-cavill-az.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/837447848450195508/images_-_2021-04-11T104017.343.jpeg",
      "https://cdn.discordapp.com/attachments/608711496041758751/837132599608475688/Tumblr_l_207969202784094.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/837132538664189972/Tumblr_l_207998917105611.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/837047090776637450/53.png",
      "https://cdn.discordapp.com/attachments/608711496041758751/835792048304160788/images_-_2021-04-11T001055.329.jpeg",
      "https://cdn.discordapp.com/attachments/608711496041758751/831243728853139496/reynmen2.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/830860636765421578/297-2975466_klaus-mikaelson.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/830452532111081477/6a334757e3bc35b795e65b89d53408ed2fb583ba.jpg",
      "https://cdn.discordapp.com/attachments/608711496041758751/829272367125102623/AnyConv.com__23_Famous_Movie_Poster_Photos_Without_Text.png"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pmovies**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pbokani")) {
    let man = [
      "https://cdn.discordapp.com/attachments/818261072816373771/842148660711653406/images_8.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842148302245593139/71gBOghCjaL._SS500_.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842148283521826836/847acb9cabd3b6a7b9cec54a67de65e7.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842148244239024178/d3d01b97b275bd88903a3261c48f899e.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842148135467352104/500x500.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842148006236127236/fecc11f87fdb10e663c18ba08d71c137.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842147340538216468/images_4.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842146420885684274/81zKHMgeEHL._SS500_.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842146409225912361/156164352_754388285516664_5014205198227141619_n.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842146398866112512/download_3.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842146033668849685/IMG_20201225_130326_035.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842145823412322334/500x500-2.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842145795477340230/500x500.jpg",
      "https://cdn.discordapp.com/attachments/818261072816373771/842150600065286214/20210103_000050.gif",
      "https://cdn.discordapp.com/attachments/818261072816373771/842151117340147742/20201107_030348.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Photo Pbokani**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "pman+lady")) {
    let man = [
      "https://cdn.discordapp.com/attachments/749243113918431273/837707995424882688/9e37bd9cd718f9c455084823b640525c.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/837707995193540678/05f36592ce0ccaace53fa36614d80cb4.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/835093463586045972/6e79842488b944be9c28dabcf5d5af5d.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/835093463783571466/807f1d24e3ecf36456e9f144aeb71ea4.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/835093405770973224/f0c2bd11bbb33d8232eb8321f9e9ac5c.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/835093405633085460/4acae8fcb63d7dbc16674572edd3e3ab.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/833268796134391848/kizlarin50tonuu_20210312_144604_0.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/833268796311470141/kizlarin50tonuu_20210312_144604_1.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/831809712340860948/IMG_20210414_113216.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/831809712102178826/IMG_20210414_113429.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/827163227523514420/165616988_105633748204811_820737070716203865_n.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/827163213601832970/165594538_272427611101179_5103716921246570111_n.jpg",
      "https://cdn.discordapp.com/attachments/749243113918431273/826719228941828116/image1.png",
      "https://cdn.discordapp.com/attachments/749243113918431273/826719228412297226/image0.png",
      "https://cdn.discordapp.com/attachments/608711481969868811/842792784242147358/image0.jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Pman+lady**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

function delay(delayInms) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(2);
   }, delayInms);
 });
}

//Bot coded by Tomato#6966 
