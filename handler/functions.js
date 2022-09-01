const {
    MessageButton,
    MessageActionRow,
    MessageEmbed
} = require("discord.js");

module.exports.confirmButtons = confirmButtons;
module.exports.randomHex = randomHex;

async function confirmButtons(message, options = {}) {
    let yn = (st) => [
        new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle(options.yes.style || "SUCCESS")
            .setLabel(options.yes.label || "Yes")
            .setEmoji(options.yes.emoji || null)
            .setCustomId("confyes")
            .setDisabled(st),
            new MessageButton()
            .setStyle(options.no.style || "DANGER")
            .setLabel(options.no.label || "No")
            .setEmoji(options.no.emoji || null)
            .setCustomId("confno")
            .setDisabled(st),
        )
    ]

    if (!message.author) {
        return new Promise(async (res) => {
            await message.reply({
                embeds: [options.embed],
                components: yn(false)
            }).catch(async () => {
                await message.followUp({
                    embeds: [options.embed],
                    components: yn(false)
                })
            })

            let msg = await message.fetchReply();

            const collector = await msg.createMessageComponentCollector({
                type: "BUTTON",
                time: 60000
            })

            collector.on("collect", async (i) => {
                if (i.user.id !== message.user.id) return i.reply({
                    content: options.othersMessage || "You cant use these buttons",
                    ephemeral: true
                })

                await i.deferUpdate();
                if (i.customId === "confyes") {
                    collector.stop("confy")
                    message.editReply({
                        components: yn(true)
                    })

                    res("yes")
                }
                if (i.customId === "confno") {
                    collector.stop("confn")
                    message.editReply({
                        components: yn(true)
                    })

                    res("no")
                }
            })

            collector.on("end", async (i, r) => {
                if (r === "time") {
                    message.editReply({
                        components: yn(true)
                    }).catch(() => {})

                    res("time")
                }
            })
        })
    } else {
        return new Promise(async (res) => {
            let msg = await message.channel.send({
                embeds: [options.embed],
                components: yn(false)
            })

            let collector = msg.createMessageComponentCollector({
                max: 1,
                componentType: "BUTTON",
                time: options.time * 1000 || 30000
            })

            collector.on("collect", async (i) => {
                if (i.user.id !== message.user.id) return i.reply({
                    content: options.othersMessage || "You cant use these buttons",
                    ephemeral: true
                })

                await i.deferUpdate();
                if (i.customId === "confyes") {
                    collector.stop("confy")
                    i.message.edit({
                        components: yn(true)
                    })

                    res("yes")
                }
                if (i.customId === "confno") {
                    collector.stop("confn")
                    i.message.edit({
                        components: yn(true)
                    })

                    res("no")
                }
            })

            collector.on("end", async (i, r) => {
                if (r === "time") {
                    msg.edit({
                        components: yn(true)
                    }).catch(() => {})

                    res("time")
                }
            })
        })
    }
}

