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
} from "@chakra-ui/react";
import { type NextPage } from "next";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { type AxiosResponse } from "axios";

interface AxiosResponseWithCategory extends AxiosResponse {
  data: {
    categories: [];
  };
}
interface SelectOption {
  id: number;
  name: string;
}
const AddFoodItem: NextPage = () => {
  const [selectOptionData, setSelectOptionData] = useState(
    [] as SelectOption[],
  );

  /** 取得菜單類別 */
  useEffect(() => {
    console.log("get category here!");
    const getCategory = async () => {
      try {
        const res: AxiosResponseWithCategory = await axios.get(
          "http://localhost:3000/api/category/",
        );
        console.log("set data here.", res.data.categories);
        const apiData = res.data.categories as SelectOption[];
        setSelectOptionData((prev) => {
          prev = apiData;
          return prev;
        });
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
  return (
    <Flex bgColor={"gray.100"} align={"center"} justify={"center"} h={"100vh"}>
      <Box h={"50vh"} bgColor={"white"} p={6}>
        <Center mb={6}>
          <Heading>新增菜單</Heading>
        </Center>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(value) => {
            console.log("values:::", value);
            console.log("submit data here!");
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormControl mb={3}>
                <FormLabel htmlFor="name">名稱</FormLabel>
                <Input
                  id="name"
                  name="fooditemName"
                  colorScheme="blue"
                  placeContent="輸入分類項目"
                >
                </Input>
              </FormControl>
              <FormControl mb={3}>
                <Select>
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

export default AddFoodItem;
