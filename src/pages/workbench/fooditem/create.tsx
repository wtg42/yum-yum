/**
 * 後台新增菜單
 */
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
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import { Formik, type FormikProps } from "formik";
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
  foodItemDescription: string;
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
    categoryId: 0,
    foodItemDescription: "",
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

        /** 用 api 動態設定 formik initialValues */
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

  /** select 元件輸出 */
  function selectContents(props: FormikProps<InitialFormValue>) {
    if (selectOptionData.length > 0) {
      return (
        <>
          <FormLabel htmlFor="categoryId">類別</FormLabel>
          <Select id="categoryId" name="categoryId" onChange={props.handleChange}>
            {selectOptionData.map((item) => {
              return (
                <option key={item.id} value={item.id}>{item.name}</option>
              );
            })}
          </Select>
        </>
      )
    } else {
      return (
        <Flex align="center" justify="center">
          <Spinner/>
        </Flex>
      )
    }
  }

  const textAreaOnChange = (e: { target: { value: string; }; }) => {
    const inputValue = e.target.value
    console.log(inputValue)
    setInitialFormValue(prev => {
      return { ...prev, foodItemDescription: inputValue }
    })
  }

  const createSubmit = async ({ fooditemName, categoryId, foodItemDescription }: InitialFormValue) => {
    try {
      console.log("ooo::", foodItemDescription)
      const f = {
        description: foodItemDescription,
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
      console.log(error)
      if (axios.isAxiosError(error)) {
        toast({
          description: error.message
        })
      } else {
        console.log(error)
      }
    }
  }

  return (
    <Flex bgColor={"gray.100"} align={"center"} justify={"center"} h={"100vh"}>
      <Box h="auto" bgColor={"white"} p={6}>
        <Center mb={6}>
          <Heading>新增菜單</Heading>
        </Center>
        <Formik
          enableReinitialize
          initialValues={initialFormValue}
          onSubmit={createSubmit}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormControl mb={3} isDisabled={selectOptionData.length <= 0}>
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
              <FormControl mb={3} isDisabled={selectOptionData.length <= 0}>
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
                {selectContents(props)}
              </FormControl>
              <FormControl mb="3" isDisabled={selectOptionData.length <= 0}>
                <FormLabel htmlFor="foodItemDescription">Price</FormLabel>
                <Textarea id="foodItemDescription" onChange={textAreaOnChange} placeholder="Enter your description here..."></Textarea>
              </FormControl>
              <FormControl>
                <Center>
                  <Button isDisabled={selectOptionData.length <= 0} type="submit" colorScheme="blue" w={"full"}>
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
