# Trivia Tiger v0.2.0
Trivia Tiger is a Discord trivia bot for servers both small and large written using [discord.js](https://github.com/discordjs/discord.js) and the [OpenTDB](https://opentdb.com/) database.

### [Add to your server](https://discord.com/api/oauth2/authorize?client_id=806067587091398677&permissions=274877908992&scope=bot%20applications.commands)
Note: the above invite link only includes permissions *currently* necessary for Trivia Tiger. More may be needed as the bot grows and features are added.

## Reporting an issue
If you notice an unexpected behavior, I would very much appreciate you [opening an issue](https://github.com/DylanMurphey/Trivia-Tiger/issues/new/choose) at this GitHub page or contacting me at the Twitter or email linked on [my GitHub profile](https://github.com/DylanMurphey).

## What does beta mean?
This bot is nowhere near what I determine to be feature complete, although it is currently too soon to release a full roadmap. The plus-side of being in beta is that this bot is *malleable*, so feedback provided through the channels mentioned above is currently *very* likely to be taken into consideration. I hope you enjoy my bot.

---

## Installation (for hosting yourself)
1. Install [Node.js version 18.0 or higher](https://nodejs.org/en/). You may use 16.9 or higher with slight modification, [see here](https://github.com/DylanMurphey/Trivia-Tiger/releases/tag/v0.2.0).
2. Download and extract [the latest release of this repository](https://github.com/DylanMurphey/Trivia-Tiger/releases/latest).
3. Navigate into `/Trivia-Tiger-main/src`. The `src` directory is the home for the good stuff going forward.
4. In a terminal, run `npm install` to automatically install dependencies
5. Create `.../Trivia-Tiger/src/config.json` (same folder as `index.js`) as follows. `token` and `clientId` can be found at the [Discord Developer Portal](https://discord.com/developers/applications) after creating a bot under "Token" and "Application ID" respectively.
   ```json
   {
       "token":"YOUR_TOKEN_HERE",
       "clientId":"BOT_USER_ID_HERE",
       "guildId":"TEST_SERVER_HERE"
   }
   ```
 6. Run `node deploy-commands.js` to register the commands with Discord.

Then you are all set! Run `node index.js` from the `src` directory, or [configure PM2](https://discordjs.guide/improving-dev-environment/pm2.html) for an ideal experience. Additionally, if you add or remove commands, make sure to re-run `deploy-commands.js`. Additionally, if you're hosting this in a public server, check the **License info** below.

## Credits
* **Dylan Murphey** - Code, design
* [**Othman Lawand**](https://www.instagram.com/othlaw.ca/) - Art

## Thanks to
* [discord.js developers](https://github.com/discordjs/discord.js)
* [PixelTail Games](https://pixeltailgames.com) for [OpenTDB](https://opentdb.com/)
* [Avik Rao](https://github.com/AvikRao)
* Mom and Dad :heart:

## License info
* OpenTDB results are available under the [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) license. 
* All code for Trivia Tiger is available under the compatible [GNU General Public License v3.0](https://github.com/DylanMurphey/Trivia-Tiger/blob/c40fc5dd4aa2995080a7c4a04a82695ee63a8942/LICENSE).
* All rights to image assets developed for Trivia Tiger are reserved.
