/**
 * Icon 點擊控制 side bar 開合
 */
import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import miStyles from "./MateriaIcon.module.css";

interface MateriaIconProps {
  barStatus: string;
  sideBarSetter: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
}
const MateriaIcon = (props: MateriaIconProps) => {
  const hoverClass = miStyles["materia-icon-btn-bg"];
  const openSideBar = props.sideBarSetter;

  /** 點擊 menu icon 切換 open | close 狀態 */
  const iconClick = () => {
    openSideBar((prev) => {
      /** 初始值是空白代表預設關閉 side bar 直接 open */      
      if (prev.trim() == "") {
        return "open"
      }
      return (prev == "close") ? "open" : "close";
    });
  };

  return (
    <div
      onClick={iconClick}
      className={`${
        hoverClass ?? ""
      } w-12 h-12 flex justify-center items-center flex-shrink-0 rounded-full`}
    >
      <span className={miStyles["material-symbols-rounded"]}>
        {props.children}
      </span>
    </div>
  );
};

export default MateriaIcon;
