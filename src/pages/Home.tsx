import { useContext, useState } from "react";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import type { DiaryItemType } from "../types/diary";
import { DiaryStateContext } from "../contexts/DiaryContext";
const getMonthlyData = (pivotDate: Date, data: DiaryItemType[]) => {
  const startTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(), // 현재 월
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1, // 다음 달
    0, // 0일은 "이전 달의 마지막 날"이므로 → 현재 월의 마지막 날
    23,
    59,
    59
  ).getTime();
  return data.filter((item) => {
    const createDate = new Date(item.createdAt).getTime();
    // console.log(createDate, typeof createDate); // number type
    return startTime <= createDate && createDate <= endTime;
  });
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotData] = useState(new Date());
  const monthlyData = getMonthlyData(pivotDate, data);
  const year = pivotDate.getFullYear();
  const month = pivotDate.getMonth();
  const fullMonth = pivotDate.toLocaleString("en-US", { month: "long" });
  const onClickIncreaseMonth = () => {
    setPivotData(new Date(year, month + 1));
  };
  const onClickDecreaseMonth = () => {
    setPivotData(new Date(year, month - 1));
  };

  return (
    <div>
      <Header
        title={`${fullMonth} ${year}`}
        leftChild={<Button text="<" onClick={onClickDecreaseMonth} />}
        rightChild={<Button text=">" onClick={onClickIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};
export default Home;
