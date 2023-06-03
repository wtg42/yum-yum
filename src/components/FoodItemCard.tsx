import { Card, CardBody, CardFooter, Stack, Heading, Text, Divider, Button, ButtonGroup } from '@chakra-ui/react'

const FoodItemCard = () => {
  return (
    <>
      <Card maxW='sm'>
        <CardBody>
          <Stack m='2' spacing='3'>
            <Heading size='md'>蛋餅</Heading>
            <Text>
              純蛋餅
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  )
}

export default FoodItemCard
