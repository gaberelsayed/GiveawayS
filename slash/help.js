const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
  name: 'help',
  description: '📜 View all the commands available to the bot!',
  run: async (client, interaction) => {
    const hembed = new MessageEmbed()
      .setTitle(`Commands of ${client.user.username}`)
      .setColor('RANDOM')
      .setDescription('**Here are all the bot commands**\n`Currently 18 commands are registered to the bot!`')
      .addFields(
        { name: '__Create__', value: `Start a giveaway in your server!\n > **How?: \`/create\`**`, inline: true },
        { name: '__Edit__', value: `Edit an already running giveaway!\n > **How?: \`/edit\`**`, inline: true },
        { name: '__End__', value: `End an already running giveaway!\n > **How?: \`/end\`**`, inline: true },
        { name: '__List__', value: `List all the giveaways running within this server!\n > **How?: \`/list\`**`, inline: true },
        { name: '__Pause__', value: `Pause an already running giveaway!\n > **How?: \`/pause\`**`, inline: true },
        { name: '__Reroll__', value: `Reroll an ended giveaway!\n > **How?: \`/reroll\`**`, inline: true },
        { name: '__Resume__', value: `Resume a paused giveaway!\n > **How?: \`/resume\`**`, inline: true },
        { name: '__Delete__', value: `Delete a ended giveaway! Dont do it if you dont have to!\n > **How?: \`/delete\`**`, inline: true},
        { name: '__Help__', value: `Shows all available commands to this bot!\n > **How?: \`/help\`**`, inline: true },
        { name: '__Invite__', value: `Get the bot's invite link!\n > **How?: \`/invite\`**`, inline: true },
        { name: '__Ping__', value: `Check the bot's websocket latency!\n > **How?: \`/ping\`**`, inline: true },
        { name: '__Vote__', value: `Vote for the bot!\n > **How?: \`/vote\`**`, inline: true },
        { name: '__Feedback__', value: `Send live feedback about the bot to the developer!\n > **How?: \`/feedback\`**`, inline: true },
        { name: '__Links__', value: `Get a llist of links related to the bot!\n > **How?: \`/links\`**`, inline: true },
        { name: '__Stats__', value: `Check the bot's physical statistics!\n > **How?: \`/stats\`**`, inline: true },
        { name: '__Faq__', value: `Frequently Asked Questions of the bot!\n > **How?: \`/faq\`**`, inline: true },
        { name: '__Updates__', value: `Get the latest news and updates from the developer!\n > **How?: \`/updates\`**`, inline: true },
        { name: '__Rps__', value: `Play rock paper scissors with the bot!\n > **How?: \`/rps\`**`, inline: true },
      )
      .setTimestamp().setFooter(`Requested by ${interaction.user.username} | GiveawaysforLife`, interaction.user.displayAvatarURL())
    interaction.reply({
      embeds: [hembed]
    });
  },
};
