import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import MonthlyChart from "../components/MonthlyChart";
import styled from "styled-components";
import YearChart from "../components/YearChart";
import type { DiaryItemType } from "../types/diary";
import {
  getMonthlyChartData,
  getYearChartDataTop3,
} from "../utils/getChartData";
import { useMemo, useState } from "react";

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  div {
    background-color: #f2f2f2;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
  }
`;

const ChartButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  flex: 1;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#333333" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  transition: 0.2s;
`;

const Chart = () => {
  const nav = useNavigate();
  const localData = localStorage.getItem("diary");
  const data: DiaryItemType[] = useMemo(
    () => (localData ? JSON.parse(localData) : []),
    [localData]
  );

  const [selected, setSelected] = useState<"monthly" | "thisYear">("monthly");

  const monthlyData = useMemo(() => getMonthlyChartData(data), [data]);
  const yearData = useMemo(() => getYearChartDataTop3(data), [data]);

  const renderChart = () => {
    if (!data || data.length === 0)
      return (
        <p
          style={{
            textAlign: "center",
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No diary entries yet.
          <br /> Start by writing your first one!
        </p>
      );

    switch (selected) {
      case "monthly":
        return <MonthlyChart data={monthlyData} />;
      case "thisYear":
        return <YearChart data={yearData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header
        title="Mood Chart"
        leftChild={
          <Button text="<" onClick={() => nav("/", { replace: true })} />
        }
      />

      <ChartWrapper>
        <ChartButton
          active={selected === "monthly"}
          onClick={() => setSelected("monthly")}
        >
          Monthly Top Moods
        </ChartButton>
        <ChartButton
          active={selected === "thisYear"}
          onClick={() => setSelected("thisYear")}
        >
          Top 3 Moods This Year
        </ChartButton>
      </ChartWrapper>

      <div>{renderChart()}</div>
    </div>
  );
};

export default Chart;
