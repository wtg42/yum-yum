/**
 * Icon 點擊控制 side bar 開合
 */
import { type ReactNode } from "react";
import miStyles from "./MateriaIcon.module.css";
import { useSideBarToggle } from "~/utils/SideBarProvider";

interface MateriaIconProps {
  children?: ReactNode;
}
const MateriaIcon = (props: MateriaIconProps) => {
  const hoverClass = miStyles["materia-icon-btn-bg"] as string;

  const sideBarToggle = useSideBarToggle()
  /** 點擊 menu icon 切換 open | close 狀態 */
  const toggleSideBarClick = () => {
    sideBarToggle()
  };


  return (
    <div
      onClick={toggleSideBarClick}
      className={`${hoverClass} w-12 h-12 flex justify-center items-center flex-shrink-0 rounded-full`}
    >
      <span className={miStyles["material-symbols-rounded"]}>
        {props.children}
      </span>
    </div>
  );
};

export default MateriaIcon;
