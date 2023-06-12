import MateriaIcon from "./MateriaIcon.tsx";
import { type SetStateAction } from "react";

/** 主頁上方的 header bar */
const Header = ({ titleClick }: {titleClick: React.Dispatch<SetStateAction<boolean>>}) => {
  function hendelHeaderClick() {
    console.log("hhhh")
    titleClick(true)
  }

  return (
    <header className="z-40 flex fixed w-full justify-between items-center bg-amber-700">
      <MateriaIcon>menu</MateriaIcon>
      <div className="flex justify-center items-center h-16">
        <div className="flex-shrink-0 font-bold text-2xl hover:cursor-pointer" onClick={() => hendelHeaderClick()}>YUM YUM FOOD.</div>
      </div>
      <div className="flex justify-end items-center">
        {/* 這裡是最右邊佔位用 */}
      </div>
    </header>
  );
};

export default Header;
