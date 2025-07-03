import styled from "styled-components";
import type { DiaryItemType } from "../types/diary";
import { useNavigate } from "react-router-dom";
import { getEmotionImage } from "../utils/getEmotionImage";
import { getEmotionBgColor } from "../utils/getEmotionBgColor";
import type { ItemProps } from "../types/emotion";

const Item = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "bgColor",
})<ItemProps>`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  background-color: ${(props) => props.bgColor};

  border-radius: 15px;
  cursor: pointer;
`;
const ImgWrapper = styled.div`
  min-width: 60px;
  height: 30px;
  display: flex;
  justify-content: center;
`;
const Img = styled.img`
  width: 50%;
`;
const CreatedAtWrapper = styled.div`
  min-width: 40px;
  display: flex;
  justify-content: center;
  border-right: 1px solid rgb(131, 131, 131);
`;

const CreatedAt = styled.div`
  font-size: 20px;
  font-weight: 800;
`;
const ContentWrapper = styled.div`
  width: 200px;
  flex: 1;
`;

const Content = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DiaryItem = ({ id, createdAt, emotionId, content }: DiaryItemType) => {
  const date = new Date(createdAt);
  const formatted = date.toLocaleDateString("en-US", {
    day: "2-digit", // 01, 02, ... 31
  });
  const nav = useNavigate();
  const bgColor = getEmotionBgColor(emotionId);
  return (
    <Item bgColor={bgColor} onClick={() => nav(`/detail/${id}`)}>
      <CreatedAtWrapper>
        <CreatedAt>{formatted}</CreatedAt>
      </CreatedAtWrapper>
      <ContentWrapper>
        <Content>{content}</Content>
      </ContentWrapper>
      <ImgWrapper>
        <Img src={getEmotionImage(emotionId) ?? ""} />
      </ImgWrapper>
    </Item>
  );
};
export default DiaryItem;
