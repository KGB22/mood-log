import type { DiaryItemType } from "../types/diary";
import { getEmotionInfo } from "./getEmotionInfo";

// 월별

const MONTH_NAMES_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getMonthlyChartData(data: DiaryItemType[]) {
  const now = new Date();
  const result = [];

  for (let month = 0; month < 12; month++) {
    const monthName = MONTH_NAMES_EN[month];

    const filtered = data.filter((item) => {
      const date = new Date(item.createdAt);
      return (
        date.getFullYear() === now.getFullYear() && date.getMonth() === month
      );
    });

    if (filtered.length === 0) {
      result.push({
        name: monthName,
        value: null,
        emotionSrc: null,
        totalCount: 0,
        topEmotionCount: 0,
        bgColor: null,
      });
      continue;
    }

    const counts: Record<number, number> = {};
    filtered.forEach((item) => {
      counts[item.emotionId] = (counts[item.emotionId] || 0) + 1;
    });

    const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topEmotionId = Number(sortedCounts[0][0]);
    const topEmotionCount = sortedCounts[0][1];

    const { emotionName, emotionSrc, bgColor } = getEmotionInfo(topEmotionId);

    result.push({
      name: monthName,
      value: emotionName,
      emotionSrc,
      totalCount: filtered.length,
      topEmotionCount,
      bgColor,
    });
  }

  return result;
}

// 올해 탑3
export function getYearChartDataTop3(data: DiaryItemType[]) {
  const now = new Date();
  const filtered = data.filter((item) => {
    const date = new Date(item.createdAt);
    return date.getFullYear() === now.getFullYear();
  });

  const counts: Record<number, number> = {};
  filtered.forEach((item) => {
    counts[item.emotionId] = (counts[item.emotionId] || 0) + 1;
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return sorted.map(([emotionId, count]) => {
    const id = Number(emotionId);
    const { emotionName, emotionSrc, bgColor } = getEmotionInfo(id);
    return {
      name: emotionName,
      value: count,
      emotionId: id,
      emotionSrc,
      bgColor,
    };
  });
}
