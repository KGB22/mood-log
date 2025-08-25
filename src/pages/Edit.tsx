import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import useDiary from "../hooks/useDiary";
import { useContext } from "react";
import { DiaryDispatchContext } from "../contexts/DiaryContext";
import type { DiaryItemType } from "../types/diary";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();

  const curDiaryItem = useDiary(Number(params.id));
  const { onUpdate } = useContext(DiaryDispatchContext)!;

  const onSubmit = (input: Omit<DiaryItemType, "id">) => {
    if (window.confirm("Save changes to this diary entry?")) {
      onUpdate(
        Number(params.id),
        input.createdAt,
        input.emotionId,
        input.content
      );

      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title="Edit Diary"
        leftChild={
          <Button text="<" onClick={() => nav(`/detail/${params.id}`)} />
        }
      />
      <Editor onSubmit={onSubmit} initData={curDiaryItem} />
    </div>
  );
};
export default Edit;
