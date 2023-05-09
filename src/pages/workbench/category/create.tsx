import { type NextPage } from "next";
import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios, { type AxiosResponse } from "axios";

interface CreateCategoryResponse extends AxiosResponse {
  data: {
    message: string;
  };
}

const Create: NextPage = () => {
  const inputNameRef = useRef(null);
  const domainNameRef = useRef("");
  const toast = useToast();
  useEffect(() => {
    const hostname = window.location.hostname;
    domainNameRef.current = hostname;
  }, [domainNameRef]);
  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    onSubmit: async (value) => {
      const { categoryName } = value;
      try {
        const result: CreateCategoryResponse = await axios({
          method: "post",
          url: "/api/category/",
          data: {
            name: categoryName,
          },
        });
        toast({
          description: result.data.message,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
          toast({
            description: error.message,
          });
        } else {
          console.log(error);
        }
      }
    },
  });

  return (
    <Flex bgColor={"gray.100"} align={"center"} justify={"center"} h={"100vh"}>
      <Box bgColor={"white"} p={6} rounded={"md"} h={"50vh"}>
        <Center mb={6}>
          <Heading>新增菜單分類</Heading>
        </Center>
        <form onSubmit={formik.handleSubmit}>
          <FormControl mb={3}>
            <FormLabel htmlFor="name">名稱</FormLabel>
            <Input
              id="name"
              name="categoryName"
              colorScheme="blue"
              placeContent="輸入分類項目"
              onChange={formik.handleChange}
              value={formik.values.categoryName}
              ref={inputNameRef}
            >
            </Input>
          </FormControl>
          <FormControl>
            <Center>
              <Button type="submit" colorScheme="blue" width="full">
                送出
              </Button>
            </Center>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default Create;
