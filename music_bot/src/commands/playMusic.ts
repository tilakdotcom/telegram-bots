import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import { Bot } from "../types/types";

const processingText = "🔄 Processing audio...";

//download folder
const downloadFolder = () => {
  const folder = path.join(__dirname, "download");
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  return folder;
};
const PlayMusic = (bot: Bot) => {
  bot.command("play", async (ctx) => {
    const song = ctx.message.text.split(" ")[1];
    const validUri = ytdl.validateURL(song);
    if (!song || !validUri) {
      ctx.reply("Please provide a song name or URL.");
      return;
    }

    const processingMessage = await ctx.reply(processingText);
    const info = await ytdl.getInfo(song);

    const audioFormate = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
      filter: "audioonly",
    });

    const downloadPAth = downloadFolder();
    const fileName = `${ctx.chat.id}_${Date.now()}.mp3`;
    const filePath = path.join(downloadPAth, fileName);

    //download the audio
    const gettingAudio = new Promise((resolve, reject) => {
      const audio = ytdl(song, { format: audioFormate });
      audio.pipe(fs.createWriteStream(filePath));
      audio.on("finish", async () => {
        try {
          await ctx.replyWithAudio(
            {
              source: filePath,
              filename: fileName,
            },
            {
              title: info.videoDetails.title,
              performer: info.videoDetails.author.name,
              duration: Number(info.videoDetails.lengthSeconds),
            }
          );
          ctx.telegram.deleteMessage(ctx.chat.id, processingMessage.message_id);

          fs.unlinkSync(filePath);
          resolve(true);
        } catch (error) {
          if (error instanceof Error) {
            ctx.reply(error.message);
            reject(error);
          } else {
            ctx.reply("Something went wrong while downloading the audio.");
            reject(error);
          }
        }
      });
    });
  });
};
