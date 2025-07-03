import { getEmotionImage } from "../utils/getEmotionImage";
import { emotions } from "./emtions";

export function getEmotionInfo(emotionId: number) {
  const found = emotions.find((e) => e.emotionId === emotionId);
  if (!found)
    return { emotionName: "Unknown", bgColor: "#ddd", emotionSrc: null };

  return {
    emotionName: found.emotionName,
    bgColor: found.bgColor,
    emotionSrc: getEmotionImage(emotionId),
  };
}
