/**
 * 側邊欄元件 預先藏在左邊視覺外面
 * 透過改變 barStatus 的 close | open 來啟動滑動動畫
 */

import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import MateriaIcon from "./MateriaIcon";
import sbStyles from "./SideBar.module.css";

interface SideBarProps {
  barStatus: string;
  sideBarSetter: Dispatch<SetStateAction<string>>;
}

const SideBar = (props: SideBarProps) => {
  /** open | close */
  const { barStatus, sideBarSetter } = props;
  /** .sidebar-animation-open | .sidebar-animation-close */
  const [ barStatusClassName, setBarStatusClassName ] = useState("")

  /** 監看 open 還是 close 附加開關動畫 */
  useEffect(() => {
    if (barStatus == 'close') {
      setBarStatusClassName(sbStyles['sidebar-animation-close'] || "")
    } else if (barStatus == 'open') {
      setBarStatusClassName(sbStyles['sidebar-animation-open'] || "")
    }
  }, [barStatus])
  // const barStatusClassName = (barStatus == "close") ? "" : sbStyles['sidebar-animation-open'] || ""

  return (
    <nav
      className={`${barStatusClassName} left-[-320px] flex flex-col items-center justify-start absolute w-[320px] h-full rounded-r-2xl bg-[#f3f6fc]`}
    >
      <div className="flex justify-start items-center w-full h-16">
        <MateriaIcon barStatus={barStatus} sideBarSetter={sideBarSetter}>menu</MateriaIcon>
      </div>
      <div className="flex">
        <button
          className="bg-red-700 w-auto p-3 rounded-full flex items-center justify-center"
        >
          {`This is a button here.`}
        </button>
      </div>
    </nav>
  );
}

export default SideBar