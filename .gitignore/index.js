const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("h!");
  

bot.login(process.env.TOKEN)
console.log("Ready to Start Utulisation")

bot.on('ready', function (){
    bot.user.setPresence({ game: { name: "| h!help | HyperiaNetwork |"}})
})

bot.on("guildMemberAdd", member => {
  member.guild.channels.find("name", "bienvenue-aurevoir").send(`__Bonjour !__ ${member} \n \n**Bienvenue sur HyperiaNetwork** ! \n \n*Besoins d'aide ? =>* \nMentione le **Staff** `)
  console.log("Quelqu'un a rejoint le Discord")
})

bot.on("guildMemberRemove", member => {
  member.guild.channels.find("name", "bienvenue-aurevoir").send(`Aurevoir ! ${member}`)
  console.log("Quelqu'un a quitté le Discord")
})

bot.on('message', message => {
    
    if (message.content === (prefix + "help")){
        var help_embed = new Discord.RichEmbed()
           .setColor('#821991')
            .addField("__Developement__", "*Desolé Steellgold me Dévelope*\n")
            .addField("__Staff__", "`sh!kick` => Expulser un joueur du serveur Discord \n`sh!ban` => Bannir un joueur du serveur Discord")
           .setFooter("Developed by Steellgold")        
           message.channel.send(help_embed)
           console.log("ed!help")
    }
  
  //commande ban
if(message.content === prefix + 'ban'){
    let raison = message.content.substr(27);
    let banMember = message.guild.member(message.mentions.users.first());
    if(!message.member.hasPermissions("BAN_MEMBERS")){
        message.channel.send(`❌ ${message.author},Tu n'as pas la permission de ban les chatons.`)
        return;
    }else{
        if(!banMember){
            message.channel.send(`❌ ${message.author}, veuillez mentionner un chaton.`)
            return;
      }else{                                                 
          if(!banMember.bannable){
              message.channel.send(`❌ ${message.author},Je peux pas ban ce chaton veuillez vérifier mes rôles et permissions`)
              return;
        }else{                                                 
            if(banMember.hasPermission("ADMINISTRATOR")){
                message.channel.send(`❌ ${message.author},ce chaton est trop puissant, je peux pas faire ça`)
                return;
            }else{
    message.delete(message.author);
    message.guild.member(banMember).ban({reason: `${raison}`});
    message.channel.sendMessage({embed:{color: `${banMember} a été ban ! raison: ${raison}`}});
            }
          }
        }
    }
  }

  
})
})
