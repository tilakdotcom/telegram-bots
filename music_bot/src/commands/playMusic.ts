import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import { Bot } from "../types/types";

//download folder
const downloadFolder = () =>{
  const folder = path.join(__dirname, "download");
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  return folder;
}

downloadFolder()


const PlayMusic = (bot: Bot) => {};

