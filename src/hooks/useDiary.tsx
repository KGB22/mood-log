import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { DiaryItemType } from "../types/diary";
import { DiaryStateContext } from "../contexts/DiaryContext";

// 일기의 내용 불러오는 커스텀 훅
const useDiary = (id: number) => {
  const nav = useNavigate();
  const params = useParams();
  const data = useContext(DiaryStateContext);
  const [curDiaryData, setCurDiaryData] = useState<DiaryItemType>();
  useEffect(() => {
    const diaryData = data.find((e) => Number(e.id) === Number(params.id));
    if (!diaryData) {
      window.alert("Diary entry not found.");
      nav("/", { replace: true });
    }
    setCurDiaryData(diaryData);
  }, [id]);
  return curDiaryData;
};
export default useDiary;
