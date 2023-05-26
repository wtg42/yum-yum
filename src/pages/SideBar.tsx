/**
 * 側邊欄元件 預先藏在左邊視覺外面
 * 透過改變 barStatus 的 close | open 來啟動滑動動畫
 * 收折時候會順便關閉遮罩
 */

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import MateriaIcon from "./MateriaIcon";
import { Button, Flex, Skeleton } from "@chakra-ui/react";
import axios, { type AxiosResponse } from "axios";
import { type FoodItem } from "@prisma/client";

/** 側邊欄 props */
interface SideBarProps {
  animationClassName: string;
  switchSideBar: () => void;
  maskProps: {
    mask: string;
    setMask: Dispatch<SetStateAction<string>>;
  };
  categoryOnClick: (items: [FoodItem]) => void
}

/** 類別街口 */
interface Category {
  id: number;
  name: string;
}

// API Response 接口
interface CategoryFoodItemResponse extends AxiosResponse {
  data: {
    message: string;
    categories: [];
    fooditems: [FoodItem];
  };
}

const SideBar = (props: SideBarProps) => {
  /** true | false */
  const { animationClassName } = props;

  /** 側邊欄位菜單項目 */
  const [categories, setCategories] = useState([]);

  /** status of skeleton */
  const [isLoaded, setIsLoaded] = useState(false);

  /** 取得類別 */
  const getCategory = async (): Promise<void> => {
    try {
      setIsLoaded(false);
      const res: CategoryFoodItemResponse = await axios({
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

  /** 這邊 fetch 資料 */
  useEffect(() => {
    getCategory().catch((err) => console.log(err));
  }, []);

  /**
   * 點擊按鈕取得該類別下的 fooditem 然後關閉 SideBar & Mask
   * onClick 寫 async await 好像會有返回 void 型別錯誤產生
   * 功能沒問題，換 Promise 寫法就不會有問題了
   */
  const showFoodItem = () => {
    axios.get('/api/fooditem/')
    .then((res: CategoryFoodItemResponse) => {
      props.categoryOnClick(res.data.fooditems);
    })
    .catch(err => console.log(err))
  }

  /**
   * 空白讀取骨架 注意：Skeleton 元件裡面骨架寬度是會吃外距
   * 要隔開每個物件需要在 Skeleton 外面再包一層使用外距才有效果
   */
  const emptySekleton = () => {
    if (!isLoaded && categories && categories.length <= 0) {
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

  /** 如果已經有產品項目就不需要 skeleton 顯示 */
  const categoryElement = () => {
    if (categories && categories.length > 0) {
      return (
        <Flex direction="column" alignItems="center">
          {categories.map((item: Category) => {
            return (
              <Button onClick={showFoodItem} mb={3} key={item.id}
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
      )
    }
    return null
  }

  return (
    <nav
      className={`${animationClassName} z-20 left-[-320px] flex flex-col items-center justify-start absolute w-[320px] h-full rounded-r-2xl bg-[#f3f6fc]`}
    >
      <div className="flex justify-start items-center w-full h-16">
      <MateriaIcon maskProps={props.maskProps} switchSideBar={props.switchSideBar}>menu</MateriaIcon>
      </div>
      {emptySekleton()}
      {emptySekleton()}
      {categoryElement()}
    </nav>
  );
};

export default SideBar;
