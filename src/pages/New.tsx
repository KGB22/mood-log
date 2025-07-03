import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../contexts/DiaryContext";
import type { DiaryItemType } from "../types/diary";

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext)!;
  const onSubmit = (input: Omit<DiaryItemType, "id">) => {
    onCreate(input.createdAt, input.emotionId, input.content);
    nav("/", { replace: true });
  };
  return (
    <div>
      <Header
        title="New Mood Entry"
        leftChild={
          <Button text="<" onClick={() => nav("/", { replace: true })} />
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};
export default New;
