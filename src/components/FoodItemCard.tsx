import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Skeleton,
} from "@chakra-ui/react";

type FoodItemCardProp = {
  name: string;
  price: number;
};

const FoodItemCard = (props: FoodItemCardProp) => {
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Stack m="2" spacing="3">
            <Heading size="md">{props.name}</Heading>
            <Text>
              純蛋餅說明
            </Text>
            <Text color="blue.600" fontSize="2xl">
              {`$${props.price}`}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default FoodItemCard;
