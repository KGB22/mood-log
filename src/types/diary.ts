export type DiaryItemType = {
  id: number;
  createdAt: Date;
  emotionId: number;
  content: string;
};

export type DiaryListType = DiaryItemType[];

export type Action =
  | { type: "INIT"; data: DiaryItemType[] }
  | { type: "CREATE"; data: DiaryItemType }
  | { type: "UPDATE"; data: DiaryItemType }
  | { type: "DELETE"; id: number };
