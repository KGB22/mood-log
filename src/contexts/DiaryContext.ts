import { createContext } from "react";
import type { DiaryListType } from "../types/diary";

export const DiaryStateContext = createContext<DiaryListType>([]);

export type DiaryDispatchType = {
  onCreate: (createdAt: Date, emotionId: number, content: string) => void;
  onUpdate: (
    id: number,
    createdAt: Date,
    emotionId: number,
    content: string
  ) => void;
  onDelete: (id: number) => void;
};
export const DiaryDispatchContext = createContext<
  DiaryDispatchType | undefined
>(undefined);
