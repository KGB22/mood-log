import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const COLORS = ["#F7E5E5", "#ECFAF3", "#F4EBF9"];

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 10px;
  gap: 10px;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
`;
type Props = {
  data: {
    name: string;
    value: number;
    emotionId: number;
    emotionSrc: string | null;
  }[];
};

const YearChart = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return <p>No data available for this year.</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            fontWeight="600"
            fontSize="13px"
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={60}
            label={({ name, value, x, y }) => (
              <text
                x={x}
                y={y}
                fill="#333"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11px"
                fontWeight={600}
              >
                {`${name}: ${value} times`}
              </text>
            )}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.emotionId}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <LegendContainer>
        {data.map((entry, index) => (
          <LegendItem
            key={entry.emotionId}
            style={{ backgroundColor: `${COLORS[index % COLORS.length]}` }}
          >
            {entry.emotionSrc && (
              <Img src={entry.emotionSrc} alt={entry.name} />
            )}
            <span>{entry.name}</span>
          </LegendItem>
        ))}
      </LegendContainer>
    </div>
  );
};
export default YearChart;
