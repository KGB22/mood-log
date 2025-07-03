import styled from "styled-components";
import type { ItemProps } from "../types/emotion";
import { getEmotionImage } from "../utils/getEmotionImage";
import React from "react";
const Img = styled.img`
  width: 30px;
  height: 30px;
  padding: 20px;
`;
const Name = styled.div`
  font-size: 14px;
`;

const ImgDiv = styled.div.withConfig({
  shouldForwardProp: (prop) => !["bgColor"].includes(prop),
})<ItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  &.selected {
    outline: 1px solid black;
    color: black;
  }
`;

type ImgWrapperProps = {
  emotionId: number;
  emotionName: string;
  bgColor: string;
  onClick: (arg0: number) => void;
  selected: boolean;
};

const ImgWrapper = ({
  emotionId,
  emotionName,
  bgColor,
  onClick,
  selected,
}: ImgWrapperProps) => {
  return (
    <ImgDiv
      className={selected ? "selected" : ""}
      bgColor={bgColor}
      onClick={() => onClick(emotionId)}
    >
      <Img src={getEmotionImage(emotionId) ?? ""} />
      <Name>{emotionName}</Name>
    </ImgDiv>
  );
};
export default React.memo(ImgWrapper);
