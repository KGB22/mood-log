import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styled from "styled-components";

type Props = {
  data: {
    name: string | null;
    value: string | null; // emotionName
    emotionSrc: string | null;
    totalCount: number;
    topEmotionCount: number;
    bgColor: string | null;
  }[];
};

const EmotionCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
`;

const EmotionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 14px;
  text-align: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const FontSt = styled.div`
  color: #222;
  font-weight: bold;
`;

const TimesSt = styled.div`
  background-color: #222;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  padding: 2px 5px;
  width: 50px;
  font-size: 12px;
`;
const MonthlyChart = ({ data }: Props) => {
  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} width={20} />
          <Tooltip
            formatter={(value, name) =>
              name === "totalCount"
                ? [`${value} times`, "Total Entries"]
                : [value, name]
            }
          />
          <Bar dataKey="totalCount" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.totalCount ? entry.bgColor! : "#ccc"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <EmotionCardWrapper>
        {data.map(
          (entry, idx) =>
            entry.value &&
            entry.emotionSrc && (
              <EmotionCard key={idx}>
                <Img src={entry.emotionSrc} alt={entry.value} />
                <div>{entry.name}</div>
                <FontSt>{entry.value}</FontSt>
                <TimesSt>{entry.topEmotionCount} times</TimesSt>
              </EmotionCard>
            )
        )}
      </EmotionCardWrapper>
    </div>
  );
};

export default MonthlyChart;
