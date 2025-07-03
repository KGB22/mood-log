import { emotions } from "./emtions";

export function getEmotionBgColor(emotionId: number): string {
  const emotion = emotions.find((e) => e.emotionId === emotionId);
  return emotion?.bgColor || "#ececec";
}
