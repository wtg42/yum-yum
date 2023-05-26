import { type Dispatch, type SetStateAction } from "react";
import MateriaIcon from "./MateriaIcon.tsx";

interface HeaderProps {
  switchSideBar: () => void;
  maskProps: {
    mask: string;
    setMask: Dispatch<SetStateAction<string>>;
  }
}

const Header = (props: HeaderProps) => {
  return (
    <header className="flex fixed w-full justify-between items-center bg-amber-700">
      <MateriaIcon maskProps={props.maskProps} switchSideBar={props.switchSideBar}>menu</MateriaIcon>
      <div className="flex justify-center items-center h-16">
        <div className="flex-shrink-0 font-bold text-2xl">YUM YUM FOOD.</div>
      </div>
      <div className="flex justify-end items-center">
        {/* 這裡是最右邊佔位用 */}
      </div>
    </header>
  );
};

export default Header;
