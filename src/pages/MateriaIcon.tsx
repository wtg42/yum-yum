/**
 * Icon 點擊控制 side bar 開合
 */
import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import miStyles from "./MateriaIcon.module.css";

interface MateriaIconProps {
  switchSideBar: () => void;
  maskProps: {
    mask: string;
    setMask: Dispatch<SetStateAction<string>>;
  }
  children?: ReactNode;
}
const MateriaIcon = (props: MateriaIconProps) => {
  const hoverClass = miStyles["materia-icon-btn-bg"];

  /** 點擊 menu icon 切換 open | close 狀態 */
  const iconClick = () => {
    props.switchSideBar()
  };

  return (
    <div
      onClick={iconClick}
      className={`${hoverClass ?? ""} w-12 h-12 flex justify-center items-center flex-shrink-0 rounded-full`}
    >
      <span className={miStyles["material-symbols-rounded"]}>
        {props.children}
      </span>
    </div>
  );
};

export default MateriaIcon;
