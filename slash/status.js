const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'status',
    description: '➕ Status page for GiveawayS!',
    run: async (client, interaction) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`${client.user.username}'s Status`)
        .setStyle('LINK')
        .setURL(`https://stats.uptimerobot.com/8gMWRsXP3N/789538269`),
    )
    let invite = new MessageEmbed()
    .setAuthor(`${client.user.username}'s Status`, client.user.avatarURL())
    .setTitle("Status Link!")
    .setDescription(`Check if ${client.user} is down or not by going to the link!`)
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Requested by ${interaction.user.username} | GiveawaySforLife`, interaction.user.displayAvatarURL())
    interaction.reply({ embeds: [invite], components: [row]});
}
}
