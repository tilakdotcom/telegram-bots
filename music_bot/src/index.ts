import "dotenv/config";
import bot from "./config/configBot";
import { botInfo, LernCommand, undefinedCommand } from "./bot";
import { quizeCommand } from "./commands/quize";
import { PlayMusic } from "./commands/playMusic";

botInfo(bot);
LernCommand(bot);
quizeCommand(bot);

PlayMusic(bot);

undefinedCommand(bot);

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
