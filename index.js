const { Client, GatewayIntentBits, SlashCommandBuilder, GuildMember, EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
  ],
});

client.on("ready", async () => {
  console.log(`${client.user.tag} online`);
});

const prefix = `,`;

  client.on('messageCreate', async (message) =>  {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    //bancommandstart
    if (command === 'ban') {
      const usertoban = message.mentions.users.first();

      if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        const failedBan = new EmbedBuilder()
      .setDescription('<:warning:1273576524163055727> <@'+message.author.id+">: The command is missing: `BAN_MEMBERS`")
      .setColor('#d1ae00') 
      return message.reply({embeds: [failedBan]});
      }
      
      else if (!usertoban) {
        const failedBan = new EmbedBuilder()
      .setDescription('<:warning:1273576524163055727> <@'+message.author.id+">: The command is missing: `mention`")
      .setColor('#d1ae00') 
      return message.reply({embeds: [failedBan]});
      }
      const user = message.mentions.users.first();
      const member = message.guild.members.cache.get(user.id);
      if (!member) {  
        return message.reply(`The user ${userToBan.tag} is not in this guild.`);
      }
      
      // Attempt to ban the member
      await member.ban();
      return message.channel.send('👍');
    }
      //bancommandend
    if (command === 'help') {
      message.channel.send(`please visit our [github](https://lol.com/) ${message.member.user} `)
    }

    if (command === 'av' || command === 'avatar') {
      if (message.mentions.users.size > 0) {
        const user = message.mentions.users.first()
        const avatarURL = user.displayAvatarURL({ format: 'png', size: 2048});
        const avatarEmbed = new EmbedBuilder()
        .setTitle(user.username+"'s avatar")
        .setImage(avatarURL)
        .setColor('#242424')
        message.reply({embeds: [avatarEmbed]})
      }
      else {
        const avatarURL = message.author.displayAvatarURL({ format: 'png', size: 2048 });
        const avatarEmbed = new EmbedBuilder()
        .setTitle(message.author.username+"'s avatar")
        .setImage(avatarURL)
        .setColor('#242424')
        message.reply({embeds: [avatarEmbed]})
      }
    }

    if (command === 'mute') {
      const userToMute = message.mentions.members.first();
      const timeArg = args[1];
      if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
          const missingPermissions = new EmbedBuilder()
        .setDescription('<:warning:1273576524163055727> <@'+message.author.id+">: You're missing the permission: `MUTE_MEMBERS`")
        .setColor('#d1ae00')
          return message.reply({embeds: [missingPermissions]});
      }
  
      if (!userToMute) {
        const failedMute = new EmbedBuilder()
      .setDescription('<:warning:1273576524163055727> <@'+message.author.id+">: The command is missing: `MENTIONED_USER`")
      .setColor('#d1ae00')
      return message.reply({embeds: [failedMute]});
      }
  
      if (!timeArg || !/^\d+[smhd]$/.test(timeArg)) {
        const failedMute = new EmbedBuilder()
      .setDescription('<:warning:1273576524163055727> <@'+message.author.id+">: The command is missing: `DURATION`")
      .setColor('#d1ae00')
      return message.reply({embeds: [failedMute]});
      }
  
      // Extract time and unit
      const timeValue = parseInt(timeArg.slice(0, -1));
      const timeUnit = timeArg.slice(-1);
  
      let duration;
      switch (timeUnit) {
        case 's':
          duration = timeValue * 1000; 
          break;
        case '':
          duration = timeValue * 1000; 
          break;
        case 'm':
          duration = timeValue * 60 * 1000; 
          break;
        case 'h':
          duration = timeValue * 60 * 60 * 1000; 
          break;
        case 'd' :
          duration = timeValue * 24 * 60 * 60 * 1000; 
          break;
        default:
          duration = timeValue * 1000; 
      }
  
      try {
        // Mute the user
        await userToMute.timeout(duration, `Muted by ${message.author.tag}`);
  
        const successMute = new EmbedBuilder()
      .setDescription('<:approved:1273586257095561246> <@'+message.author.id+">: User muted successfully")
      .setColor('#2f9e00')
  
        message.reply({ embeds: [successMute] });
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while trying to mute the user.');
      }
    }

    if (command === 'unmute') {
      const selectedUser = message.mentions.members.first();

      if (!selectedUser) {
        const failedMute = new EmbedBuilder()
      .setDescription('<:warning:1273576524163055727> <@'+message.author.id+">: The command is missing: `USER_TO_UNMUTE`")
      .setColor('#d1ae00')
      return message.reply({embeds: [failedMute]});
      } else {
        await selectedUser.timeout(null);

        message.react('👍')
        const successMute = new EmbedBuilder()
      .setDescription('<:approved:1273586257095561246> <@'+message.author.id+">: User unmuted successfully")
      .setColor('#2f9e00')
  
      return message.channel.send({ embeds: [successMute] });}
        
    }
    
      

});


client.login('INSERT_TOKEN')
