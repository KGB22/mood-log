import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { emotions } from "../utils/emtions";
import type { DiaryItemType } from "../types/diary";
import { getStringDate } from "../utils/getStringDate";
import ImgWrapper from "./ImgWrapper";
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
`;
const DateWrapper = styled.section`
  input {
    background-color: rgb(236, 236, 236);
    border: none;
    border-radius: 5px;
    font-size: 18px;
    padding: 10px 20px;
    color: black;
  }
`;

const BtnWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const MoodWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const DiaryWrapper = styled.section``;

const ImgesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2%;
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  min-height: 200px;
  outline-color: black;
  padding: 10px;
  box-sizing: border-box;
`;

const ErrorText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "visible",
})<{ visible: boolean }>`
  height: 1.2em;
  color: red;
  margin-top: 4px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

type EditorProps = {
  onSubmit?: (input: Omit<DiaryItemType, "id">) => void | undefined;
  initData?: DiaryItemType;
};

const Editor = ({ onSubmit, initData }: EditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedMood, setSelectedMood] = useState<number>(5);
  const [input, setInput] = useState({
    createdAt: new Date(),
    emotionId: 5,
    content: "",
  });
  const [error, setError] = useState("");

  const nav = useNavigate();

  const onClickSubmitBtn = () => {
    if (!input.content.trim()) {
      setError("Please write something before saving.");
      textareaRef.current?.focus();
      return;
    }
    setError("");
    onSubmit?.(input);
  };

  useEffect(() => {
    if (initData) {
      const safeDate = new Date(initData.createdAt);
      setInput({
        ...initData,
        createdAt: isNaN(safeDate.getTime()) ? new Date() : safeDate,
      });
      setSelectedMood(initData.emotionId);
    }
  }, [initData]);

  const onClickMood = useCallback((id: number) => {
    setSelectedMood(id);
    setInput((prev) => ({ ...prev, emotionId: id }));
  }, []);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name: string = e.target.name;
    let value: string | Date = e.target.value;
    if (name === "createdAt") {
      value = new Date(value);
    }
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MainWrapper>
      <DateWrapper>
        <h4>Today's Date</h4>
        <input
          type="date"
          name="createdAt"
          value={getStringDate(input.createdAt)}
          onChange={onChangeInput}
        />
      </DateWrapper>
      <MoodWrapper>
        <h4>How was your day?</h4>
        <ImgesBox>
          {emotions.map(({ emotionId, emotionName, bgColor }) => (
            <ImgWrapper
              key={emotionId}
              emotionId={emotionId}
              emotionName={emotionName}
              bgColor={bgColor}
              onClick={onClickMood}
              selected={selectedMood === emotionId}
            />
          ))}
        </ImgesBox>
      </MoodWrapper>
      <DiaryWrapper>
        <h4>What made you feel that way?</h4>
        <TextArea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          ref={textareaRef}
          aria-invalid={!!error}
        />
        <ErrorText visible={!!error} role="alert">
          {error || "\u00A0"}
        </ErrorText>
      </DiaryWrapper>
      <BtnWrapper>
        <Button
          text="Cancel"
          onClick={() => nav("/", { replace: true })}
        ></Button>
        <Button text="Save" type="POSITIVE" onClick={onClickSubmitBtn}></Button>
      </BtnWrapper>
    </MainWrapper>
  );
};

export default Editor;

// ImgWrapper React.memo 사용
//=>자식 컴포넌트가 props가 바뀌지 않으면 리렌더링 안 하도록 막아주지만
// 부모에서 자식으로 넘기는 함수가 매 렌더링마다 새 함수 객체라면 무용지물
// ==> 부모에게서 넘어오는 onClickMood 함수가 부모에서 계속 리렌더링 되어 무용지물이었음
// Editor useCallback 사용
// => 함수 객체를 메모이제이션해서 같은 참조값으로 유지하게 해줌 (onClickMood)
// ==> 자식 컴포넌트가 React.memo로 감싸져 있고
//  부모가 함수형 props를 넘긴다면 useCallback으로 함수 고정 꼭 해야 함

// React.memo는 props가 얕은 비교로 같으면 리렌더링을 막아주지만
// 매번 새로 생성되는 함수는 참조가 다르기 때문에 같지 않다고 판단해서 리렌더링 시킴
// 그래서 useCallback을 써서 함수 객체를 메모이제이션(고정)해주면
// React.memo가 제대로 동작해서 선택된 selectedMood에
// 해당하는 컴포넌트만 리렌더링 됨
