import MateriaIcon from "./MateriaIcon.tsx";

/** 主頁上方的 header bar */
const Header = () => {
  return (
    <header className="z-40 flex fixed w-full justify-between items-center bg-amber-700">
      <MateriaIcon>menu</MateriaIcon>
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
