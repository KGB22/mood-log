import styled from "styled-components";
import type { DiaryItemType } from "../types/diary";
import { getEmotionImage } from "../utils/getEmotionImage";
import { emotions } from "../utils/emtions";
import Button from "./Button";
import { useParams } from "react-router-dom";
import type { ItemProps } from "../types/emotion";
import { getEmotionBgColor } from "../utils/getEmotionBgColor";

type ViewerProps = Pick<DiaryItemType, "emotionId" | "content"> & {
  onClickDelete: (id: number) => void;
};

const ViewerWrapper = styled.div`
  section {
    width: 100%;
    margin-bottom: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;
const Emotion = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "bgColor",
})<ItemProps>`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #3f3f3f;
  background-color: ${(props) => props.bgColor};
  img {
    height: 40px;
  }
`;
const Content = styled.div`
  width: 100%;
  background-color: rgb(236, 236, 236);
  border-radius: 5px;

  word-break: break-all;
  p {
    padding: 20px;
    text-align: left;
    font-size: 16px;
    font-weight: 200;
    line-height: 1.5;
  }
`;
const Buttons = styled.section`
  margin-bottom: 40px;
`;
const Viewer = ({ emotionId, content, onClickDelete }: ViewerProps) => {
  const emotion = emotions.find(
    (i) => String(i.emotionId) === String(emotionId)
  );

  const params = useParams();
  const bgColor = getEmotionBgColor(emotionId);
  return (
    <ViewerWrapper>
      <section>
        <h4>Today's Mood</h4>
        <Emotion bgColor={bgColor}>
          <img src={getEmotionImage(emotionId) ?? ""} />
          <div>{emotion?.emotionName}</div>
        </Emotion>
      </section>
      <section>
        <h4>Today's Entry</h4>
        <Content>
          <p style={{ whiteSpace: "pre-line" }}>{content}</p>
        </Content>
      </section>
      <Buttons>
        <Button
          text="Delete"
          type="NEGATIVE"
          onClick={() => onClickDelete(Number(params.id))}
        ></Button>
      </Buttons>
    </ViewerWrapper>
  );
};
export default Viewer;
