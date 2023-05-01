/**
 * 側邊欄元件 預先藏在左邊視覺外面
 * 透過改變 barStatus 的 close | open 來啟動滑動動畫
 */

import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import MateriaIcon from "./MateriaIcon";
import sbStyles from "./SideBar.module.css";
import { Button, Flex } from "@chakra-ui/react";

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

  return (
    <nav
      className={`${barStatusClassName} left-[-320px] flex flex-col items-center justify-start absolute w-[320px] h-full rounded-r-2xl bg-[#f3f6fc]`}
    >
      <div className="flex justify-start items-center w-full h-16">
        <MateriaIcon barStatus={barStatus} sideBarSetter={sideBarSetter}>menu</MateriaIcon>
      </div>
        <Flex direction="column" alignItems="center">
          <Button
            width={263}
            colorScheme="blue"
            rounded={20}
            _hover={{
              background: "#e5e9ed",
              color: "teal.500",
            }}
          >蛋餅
          </Button>
        </Flex>        
    </nav>
  );
}

export default SideBar