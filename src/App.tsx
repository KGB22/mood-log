import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import Chart from "./pages/Chart";
import Notfound from "./pages/Notfound";
import type { Action, DiaryListType } from "./types/diary";
import {
  DiaryDispatchContext,
  DiaryStateContext,
} from "./contexts/DiaryContext";
import { useEffect, useReducer, useRef, useState } from "react";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/detail/:id" : 특정 일기를 상세히 조회하는 Detail 페이지
// 4. "/edit/:id" : 일기를 수정하는 Edit 페이지
// 5. "/chart" : 일기에 등록된 감정 현황을 확인하는 Chart 페이지
// 6. "*" : 설정된 path 제외한 다른 path에 접근할 경우 Notfound 페이지

function reducer(state: DiaryListType, action: Action): DiaryListType {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      nextState = [action.data, ...state];
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        item.id === action.data.id ? action.data : item
      );
      break;
    case "DELETE":
      nextState = state.filter((item) => item.id !== action.id);
      break;
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

function App() {
  const idRef = useRef(0);
  const [data, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storeData = localStorage.getItem("diary");
    if (!storeData) {
      setIsLoading(false);
      return;
    }
    const parseData = JSON.parse(storeData);

    if (!Array.isArray(parseData)) {
      setIsLoading(false);
      return;
    }
    let maxId = 0;
    parseData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;
    dispatch({ type: "INIT", data: parseData });
    setIsLoading(false);
  }, []);
  const onCreate = (createdAt: Date, emotionId: number, content: string) => {
    dispatch({
      type: "CREATE",
      data: { id: idRef.current++, createdAt, emotionId, content },
    });
  };
  const onUpdate = (
    id: number,
    createdAt: Date,
    emotionId: number,
    content: string
  ) => {
    dispatch({ type: "UPDATE", data: { id, createdAt, emotionId, content } });
  };
  const onDelete = (id: number) => {
    dispatch({ type: "DELETE", id });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/chart" element={<Chart />}></Route>
            <Route path="*" element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
