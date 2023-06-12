/**
 * 這個頁面調整產品內容 e.g. 要加辣 但半熟之類的
 */
import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";

const FoodItemOrder = () => {
  const router = useRouter();

  const { itemId } = router.query;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minW="100vw" minH="100vh" bg={"#fef4ec"}>
      <Card w="80vw" h="80vh">
        <CardHeader>
          <Stack>
            <Text fontSize="4xl" fontWeight="bold">{`產品內容 ${itemId as string} `}</Text>
          </Stack>
        </CardHeader>
        <CardBody overflow="scroll">
          <Text fontSize="xl">這邊設計一個可以調整點餐內容的元件</Text>
        </CardBody>
        <CardFooter>
          <Text fontSize="4xl" fontWeight="bold">Footer</Text>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default FoodItemOrder;
