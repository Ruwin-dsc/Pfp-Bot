const { Client, Intents } = require("discord.js")

const client = new Client({ intents: Object.values(Intents.FLAGS) })

const config = require("./config.json")

client.on("ready", async () => {

    console.log(`Connecté en tant que ${client.user.tag}!`)

    setInterval(async () => {

        config.pfp.map(async (id) => {

            const channel = client.channels.cache.get(id)

            const guild = channel.guild

            const user = (await guild.members.fetch()).filter(m => !m.user.bot).random().user

            channel.send({

                embeds: [{

                    author: { iconURL: user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }),  name: user.tag },

                    description: `[PNG](${user.displayAvatarURL({ size: 2048, format: "png" })}) - [JPEG](${user.displayAvatarURL({ size: 2048, format: "jpeg" })}) - [JPG](${user.displayAvatarURL({ size: 2048, format: "jpg" })}) - [WEBP](${user.displayAvatarURL({ size: 2048, format: "webp" })}) - [GIF](${user.displayAvatarURL({ size: 2048, format: "gif" })})`,

                    image: { url: user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) },

                    

                    footer: config.footer, 

                    color: config.color

                }]

            })

        })

    }, parseInt(config.time))

    setInterval(async () => {

        config.banner.map(async (id) => {

            const channel = client.channels.cache.get(id)

            const guild = channel.guild

            const user = (await guild.members.fetch()).filter(m => !m.user.bot).random().user

            await user.fetch()

            

            if (!user.bannerURL()) return;

            channel.send({

                embeds: [{

                    author: { iconURL: user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }),  name: user.tag },

                    description: `[PNG](${user.bannerURL({ size: 2048, format: "png" })}) - [JPEG](${user.bannerURL({ size: 2048, format: "jpeg" })}) - [JPG](${user.bannerURL({ size: 2048, format: "jpg" })}) - [WEBP](${user.bannerURL({ size: 2048, format: "webp" })}) - [GIF](${user.bannerURL({ size: 2048, format: "gif" })})`,

                    image: { url: user.bannerURL({ dynamic: true, format: "png", size: 2048 }) },

                    

                    footer: config.footer,

                    color: config.color

                }]

            })

        })

    }, parseInt(config.time2))

})

client.login(config.token)