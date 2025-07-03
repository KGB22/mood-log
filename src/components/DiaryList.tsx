import styled from "styled-components";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import type { DiaryListType } from "../types/diary";
import { useState } from "react";
import Count from "./Count";

const MenuBar = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 10px;
`;
const Select = styled.select`
  background-color: #ececec;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  outline-color: black;
  color: #333333;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

type DiaryListProps = {
  data: DiaryListType;
};
const DiaryList = ({ data }: DiaryListProps) => {
  const nav = useNavigate();
  const [selected, setSelected] = useState("latest");
  const onChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  const counter = data.length;

  const showSelectedOption = () => {
    return data.sort((a, b) => {
      if (selected === "oldest") {
        return Number(a.createdAt) - Number(b.createdAt);
      } else {
        return Number(b.createdAt) - Number(a.createdAt);
      }
    });
  };
  const getSelectedOptionData = showSelectedOption();
  return (
    <div className="DiaryList">
      <MenuBar>
        <Select onChange={onChangeOption}>
          <option value="latest">latest</option>
          <option value="oldest">oldest</option>
        </Select>
        <Button
          text="new Mood Entry"
          type="POSITIVE"
          onClick={() => nav("/new")}
        />
      </MenuBar>
      <Count counter={counter} />
      {!data || data.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No diary entries yet.
          <br /> Start by writing your first one!
        </p>
      ) : (
        <ListWrapper>
          {getSelectedOptionData.map((item) => (
            <DiaryItem key={item.id} {...item} />
          ))}
        </ListWrapper>
      )}
    </div>
  );
};

export default DiaryList;

// <input>	React.ChangeEvent<HTMLInputElement>
// <select>	React.ChangeEvent<HTMLSelectElement>
// <textarea>	React.ChangeEvent<HTMLTextAreaElement></HTMLTextAreaElement>
