# Trivia Tiger!
Trivia Tiger is a Discord trivia bot for servers both small and large written using [discord.js](https://github.com/discordjs/discord.js) and the [OpenTDB](https://opentdb.com/) database.

## Installation
1. Install [Node.js version 16.x or higher](https://nodejs.org/en/). While Node is preinstalled on many operatings systems, certain elements introduced in discord.js v13 which are critical to Trivia Tiger require Node version 16 or higher.
2. Download and extract [the latest version of this repository](https://github.com/DylanMurphey/Trivia-Tiger/archive/refs/heads/main.zip).
3. Navigate into `/Trivia-Tiger-main`
4. In a terminal, run `npm install --prefix ./src` to automatically install dependencies
5. Create `/Trivia-Tiger/src/config.json` as follows. `token` and `clientId` can be found at the [Discord Developer Portal](https://discord.com/developers/applications) after creating a bot under "Token" and "Application ID" respectively.
   ```json
   {
       "token":"YOUR_TOKEN_HERE",
       "clientId":"BOT_USER_ID_HERE",
       "guildId":"TEST_SERVER_HERE"
   }
   ```
 6. Run `node ./src/deploy-commands.js` to register the commands with Discord.

Then you are all set! Run `node ./src/index.js` from the `/TriviaTiger` directory, or [configure PM2](https://discordjs.guide/improving-dev-environment/pm2.html) for an ideal experience. Additionally, if you add or remove commands, make sure to re-run `deploy-commands.js`

## Credits
**Dylan Murphey** - Code, design

## Thanks to
[discord.js developers](https://github.com/discordjs/discord.js)

[PixelTail Games](https://pixeltailgames.com) for [OpenTDB](https://opentdb.com/)

[Avik Rao](https://github.com/AvikRao)

Mom and Dad :heart:
