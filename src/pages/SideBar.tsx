/**
 * 側邊欄元件 預先藏在左邊視覺外面
 * 透過改變 barStatus 的 close | open 來啟動滑動動畫
 * 收折時候會順便關閉遮罩
 */

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import MateriaIcon from "./MateriaIcon";
import sbStyles from "./SideBar.module.css";
import { Button, Flex, Skeleton } from "@chakra-ui/react";
import axios, { type AxiosResponse } from "axios";

interface SideBarProps {
  barStatus: string;
  sideBarSetter: Dispatch<SetStateAction<string>>;
  maskProps: {
    mask: string;
    setMask: Dispatch<SetStateAction<string>>;
  };
}

interface Category {
  id: number;
  name: string;
}

interface CreateFoodItemResponse extends AxiosResponse {
  data: {
    message: string;
    categories: [];
  };
}

const SideBar = (props: SideBarProps) => {
  /** open | close */
  const { barStatus, sideBarSetter } = props;

  /** .sidebar-animation-open | .sidebar-animation-close */
  const [barStatusClassName, setBarStatusClassName] = useState("");

  /** 側邊欄位菜單項目 */
  const [categories, setCategories] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const getCategory = async (): Promise<void> => {
    try {
      setIsLoaded(false);
      const res: CreateFoodItemResponse = await axios({
        method: "get",
        url: "/api/category/",
      });
      if (res.data.message == "success") {
        setCategories((_prev) => res.data.categories);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoaded(true);
    }
  };

  /** 監看 open 還是 close 附加開關動畫 */
  useEffect(() => {
    if (barStatus == "close") {
      setBarStatusClassName(sbStyles["sidebar-animation-close"] || "");
    } else if (barStatus == "open") {
      setBarStatusClassName(sbStyles["sidebar-animation-open"] || "");
    }
  }, [barStatus]);


  /** 這邊 fetch 資料 */
  useEffect(() => {
    getCategory().catch((err) => console.log(err));
  }, []);

  /**
   * 空白讀取骨架 注意：Skeleton 元件裡面骨架寬度是會吃外距
   * 要隔開每個物件需要在 Skeleton 外面再包一層使用外距才有效果
   */
  const emptySekleton = () => {
    if (!isLoaded) {
      return (
        <Flex mb={3} direction="column" alignItems="center">
          <Skeleton  fadeDuration={1} isLoaded={isLoaded}>
            <Button
              width={263}
            >
            </Button>
          </Skeleton>
        </Flex>
      )
    }
    return null
  }

  return (
    <nav
      className={`${barStatusClassName} z-20 left-[-320px] flex flex-col items-center justify-start absolute w-[320px] h-full rounded-r-2xl bg-[#f3f6fc]`}
    >
      <div className="flex justify-start items-center w-full h-16">
        <MateriaIcon
          maskProps={props.maskProps}
          barStatus={barStatus}
          sideBarSetter={sideBarSetter}
        >
          menu
        </MateriaIcon>
      </div>
      {emptySekleton()}
      {emptySekleton()}

      <Skeleton fitContent={true} fadeDuration={1} isLoaded={isLoaded}>
        <Flex direction="column" alignItems="center">
          {categories.map((item: Category) => {
            return (
              <Button mb={3} key={item.id}
                width={263}
                colorScheme="blue"
                rounded={20}
                _hover={{
                  background: "#e5e9ed",
                  color: "teal.500",
                }}
              >
                {item?.name}
              </Button>
            );
          })}
        </Flex>
      </Skeleton>
    </nav>
  );
};

export default SideBar;
