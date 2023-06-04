import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { type AxiosResponse } from "axios";

/** 為了解析 api 物件內容 */
interface AxiosResponseWithCategory extends AxiosResponse {
  data: {
    categories: [];
  };
}

/** select 元件資料的物件接口 */
interface SelectOption {
  id: number;
  name: string;
}

/** 動態設定 Formik 初始值 */
type InitialFormValue = {
  fooditemName: string;
  categoryId: number;
}

interface CreateFoodItemResponse extends AxiosResponse {
  data: {
    message: string
  }
}

const Create: NextPage = () => {
  /** select 元件內容 */
  const [selectOptionData, setSelectOptionData] = useState(
    [] as SelectOption[],
  );

  const [initialFormValue, setInitialFormValue] = useState<InitialFormValue>({
    fooditemName: "",
    categoryId: 0
  })

  /** 取得菜單類別 */
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res: AxiosResponseWithCategory = await axios.get(
          "/api/category/",
        );
        const apiData = res.data.categories as SelectOption[];
        /** 填充 select option 的內容 */
        setSelectOptionData((_prev) => {
          return apiData
        });

        /** 動態設定 formik initialValues */
        setInitialFormValue((_prev) => {
          return { fooditemName: apiData[0]?.name, categoryId: apiData[0]?.id } as InitialFormValue
        })
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
      }
    };
    void getCategory();
  }, []);

  /** toast */
  const toast = useToast()
  return (
    <Flex bgColor={"gray.100"} align={"center"} justify={"center"} h={"100vh"}>
      <Box h={"50vh"} bgColor={"white"} p={6}>
        <Center mb={6}>
          <Heading>新增菜單</Heading>
        </Center>
        <Formik
          enableReinitialize
          initialValues={initialFormValue}
          onSubmit={async ({ fooditemName, categoryId }) => {
            try {
              const f = {
                categoryId: categoryId,
                itemName: fooditemName,
                price: 450,
                isShow: false,
              }
              const res: CreateFoodItemResponse = await axios({
                method: "POST",
                url: "/api/fooditem/",
                data: f,
              })
              toast({ description: res.data.message })
            } catch (error) {
              if (axios.isAxiosError(error)) {
                toast({
                  description: error.message
                })
              } else {
                console.log(error)
              }
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormControl mb={3}>
                <FormLabel htmlFor="fooditemName">名稱</FormLabel>
                <Input
                  id="fooditemName"
                  name="fooditemName"
                  colorScheme="blue "
                  placeContent="輸入分類項目"
                  onChange={props.handleChange}
                >
                </Input>
              </FormControl>
              <FormControl mb={3}>
                <FormLabel htmlFor="fooditemPrice">Price</FormLabel>
                <Input
                  id="fooditemPrice"
                  name="fooditemPrice"
                  colorScheme="blue "
                  placeContent="輸入分類項目"
                  onChange={props.handleChange}
                >
                </Input>
              </FormControl>
              <FormControl mb={3}>
                <FormLabel htmlFor="categoryId">類別</FormLabel>
                <Select id="categoryId" name="categoryId" onChange={props.handleChange}>
                  {selectOptionData.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <Center>
                  <Button type="submit" colorScheme="blue" w={"full"}>
                    送出
                  </Button>
                </Center>
              </FormControl>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Create;
