import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import useDiary from "../hooks/useDiary";
import Viewer from "../components/Viewer";
import type { DiaryItemType } from "../types/diary";
import { getStringDate } from "../utils/getStringDate";
import { useContext } from "react";
import { DiaryDispatchContext } from "../contexts/DiaryContext";

const Detail = () => {
  const nav = useNavigate();
  const params = useParams();
  const curDiaryData = useDiary(Number(params.id));
  const { onDelete } = useContext(DiaryDispatchContext)!;
  const onClickDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this diary entry?")) {
      onDelete(id);
      nav("/", { replace: true });
    }
  };

  if (!curDiaryData) {
    return <div>Loading...</div>;
  }

  const { createdAt, emotionId, content }: DiaryItemType = curDiaryData;

  const title = getStringDate(new Date(createdAt));

  return (
    <div>
      <Header
        title={`${title} Log`}
        leftChild={
          <Button text="<" onClick={() => nav("/", { replace: true })} />
        }
        rightChild={
          <Button
            text="Edit"
            onClick={() => nav(`/edit/${params.id}`)}
          ></Button>
        }
      />

      <Viewer
        content={content}
        emotionId={emotionId}
        onClickDelete={onClickDelete}
      />
    </div>
  );
};
export default Detail;
