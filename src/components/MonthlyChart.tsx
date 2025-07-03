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
  width: 60px;
  font-size: 14px;
  text-align: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
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
                <div>{entry.value}</div>
                <div>{entry.topEmotionCount} times</div>
              </EmotionCard>
            )
        )}
      </EmotionCardWrapper>
    </div>
  );
};

export default MonthlyChart;
