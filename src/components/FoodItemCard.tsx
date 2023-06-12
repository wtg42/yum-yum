import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"

type FoodItemCardProp = {
  name: string;
  price: number;
};

const FoodItemCard = (props: FoodItemCardProp) => {

  const router = useRouter()

  function handleClick() {
    console.log("TO DO: 跳轉產品客製頁面")
    router.push('/FoodItemOrder/11').catch(err => console.log(err))
  }
  return (
    <Card maxW="sm">
      <CardHeader>
        <Stack m="2" spacing="3">
          <Heading size="md">{props.name}</Heading>
          <Text>
            TO DO: Esse reprehenderit quis exercitation consectetur laborum reprehenderit incididunt veniam dolore consectetur eiusmod reprehenderit aute enim.
          </Text>
        </Stack>
      </CardHeader>
      <CardBody>

      </CardBody>
      <Divider />
      <CardFooter justifyContent="space-between">
        <Box>
          <Text color="#c0985f" fontSize="2xl" fontWeight="bold">
            {`$${props.price}`}
          </Text>
        </Box>
        <Button variant="solid" colorScheme="blue" fontSize="1.5rem" onClick={() => handleClick()}>
          <AddIcon></AddIcon>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodItemCard;
