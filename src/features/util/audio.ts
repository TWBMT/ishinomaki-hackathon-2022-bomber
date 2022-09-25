import { getFilePath } from "./chrome-extension";

export const playMusic = async (filePath: string) => {
  const audio = new Audio();
  audio.src = getFilePath(filePath);
  audio.play();
};
