import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type CountProps = {
  counter: number;
};
const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
  gap: 10px;
`;
const Counter = styled.div`
  width: 80px;
  text-align: center;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: rgb(240, 240, 240);
`;
const Chart = styled.div`
  width: 80px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: rgb(240, 240, 240);
  cursor: pointer;
  &:hover {
    color: rgb(240, 240, 240);
    background-color: rgb(65, 65, 65);
  }
`;
const Count = ({ counter }: CountProps) => {
  const nav = useNavigate();

  const onClick = () => {
    nav("/chart", { replace: true });
  };
  return (
    <CounterWrapper>
      <Chart onClick={onClick}>Mood Chart</Chart>
      <Counter>{counter} memories</Counter>
    </CounterWrapper>
  );
};
export default Count;
