const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("h!");
  

bot.login(process.env.TOKEN)
console.log("Ready to Start Utulisation")

bot.on('ready', function (){
    bot.user.setPresence({ game: { name: "| h!help | HyperiaNetwork |"}})
    bot.user.setPresence({status:'dnd'})
})

bot.on("guildMemberAdd", member => {
  member.guild.channels.find("name", "bienvenue-aurevoir").send(`__Bonjour !__ ${member.user.username} \n \n**Bienvenue sur HyperiaNetwork** ! \n \n*Besoins d'aide ? =>* \nMentione le **Staff** `)
  console.log("Quelqu'un a rejoint le Discord")
})

bot.on('guildMemberAdd', member => {
      var role = member.guild.roles.find('name', "| JOUEUR |");
      member.addRole(role)
      })

bot.on("guildMemberRemove", member => {
  member.guild.channels.find("name", "bienvenue-aurevoir").send(`Aurevoir ! ${member.user.username}`)
  console.log("Quelqu'un a quitté le Discord")
})

bot.on('message', message => {
    
    if (message.content === (prefix + "help")){
        var help_embed = new Discord.RichEmbed()
           .setColor('#821991')
            .addField("__Developement__", ":warning: *Bot en Dévelopement* :warning: \n")
            .addField("__Staff__", "`sh!kick [SOON]` => Expulser un joueur du serveur Discord \n`sh!ban [SOON]` => Bannir un joueur du serveur Discord")
            .addField("__Joueur__", "`h!ip` => Savoir l'ip pour acceder au serveur")
        .setFooter("Developed by Steellgold")        
           message.channel.send(help_embed)
           console.log("ed!help")
    }
  
  if (message.content === (prefix + "ip")){
        var help_embed = new Discord.RichEmbed()
           .setColor('#821991')
            .addField("__Oups__", "*Desolé je n'est pas le doit de donner l'ip*\n")
            .setFooter("Developed by Steellgold")        
           message.channel.send(help_embed)
           console.log("ed!help")
    }
  
if(message.content.startsWith(prefix + 'say')) {
      if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")){
        return message.reply("Oups :'( __Pas asser de permissions__").catch(console.error)
        }
                message.delete(2)
                message.channel.send(message.content.slice(5, message.content.lenght));

  }

     //commande de kick
  if(message.content === prefix + 'kick'){
  let raison = message.content.substr(28);
  let kickMember = message.guild.member(message.mentions.users.first());
  if(!message.member.hasPermissions("KICK_MEMBERS")){
      message.channel.send(`:x: ${message.author},Tu n'as pas la permission de kick les chatons.`)
      return;
  }else{
      if(!kickMember){
          message.channel.send(`:x: ${message.author}, veuillez mentionner un chaton.`)
          return;
    }else{                                                 
        if(!kickMember.kickable){
            message.channel.send(`:x: ${message.author},Je peux pas kick ce chaton veuillez vérifier mes rôles et permissions`)
            return;
      }else{                                                 
          if(kickMember.hasPermission("ADMINISTRATOR")){
              message.channel.send(`:x: ${message.author},ce chaton est trop puissant, je peux pas faire ça`)
              return;
          }else{
  message.delete(message.author);
  message.guild.member(kickMember).kick({reason: `${raison}}`});
  message.channel.sendMessage(`:x: ${kickMember}a été kick!aison ${raison}"`);
          }
        }
      }
  }
}
//commande ban
if(message.content === prefix + 'ban'){
    let raison = message.content.substr(27);
    let banMember = message.guild.member(message.mentions.users.first());
    if(!message.member.hasPermissions("BAN_MEMBERS")){
        message.channel.send(`:x: ${message.author},Tu n'as pas la permission de ban les chatons.`)
        return;
    }else{
        if(!banMember){
            message.channel.send(`:x: ${message.author}, veuillez mentionner un chaton.`)
            return;
      }else{                                                 
          if(!banMember.bannable){
              message.channel.send(`:x: ${message.author},Je peux pas ban ce chaton veuillez vérifier mes rôles et permissions`)
              return;
        }else{                                                 
            if(banMember.hasPermission("ADMINISTRATOR")){
                message.channel.send(`:x: ${message.author},ce chaton est trop puissant, je peux pas faire ça`)
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
