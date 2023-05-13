import { type Dispatch, type SetStateAction } from "react";
import MateriaIcon from "./MateriaIcon.tsx";

interface HeaderProps {
  barStatus: string;
  sideBarSetter: Dispatch<SetStateAction<string>>;
  maskProps: {
    mask: string;
    setMask: Dispatch<SetStateAction<string>>;
  }
}

const Header = (props: HeaderProps) => {
  /**
   * 解構父元件傳來的 側邊欄 props 跟 側邊欄遮罩 props
   * barStatus, siedeBarSetter 是側邊欄狀態變數
   * maskprops 是側邊欄遮罩變數
   */
  const { barStatus, sideBarSetter, maskProps } = props;

  return (
    <header className="flex fixed w-full justify-between items-center bg-amber-700">
      <MateriaIcon maskProps={maskProps} barStatus={barStatus} sideBarSetter={sideBarSetter}>menu</MateriaIcon>
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
