import type { ReactNode } from "react";
import "./Header.css";
type HeaderProps = {
  title: string;
  leftChild?: ReactNode;
  rightChild?: ReactNode;
};
const Header = ({ title, leftChild, rightChild }: HeaderProps) => {
  return (
    <div className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightChild}</div>
    </div>
  );
};

export default Header;
