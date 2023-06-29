/**
 * 這是客製化的畫面
 * 數量，配料，特殊需求
 * 分為三大部分，由業主後台項目控制
 * 分為必選跟可選，還可以再區分單選跟複選
 */

import {
  Button,
  Select,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";


interface CustomizeProps {
  itemName: string | string[] | undefined;
}

const OrderDetail = (props: CustomizeProps) => {
  return (
    <>
      <Heading>{ props.itemName }</Heading>
      <Stack spacing='6'>
        <Text>123</Text>
        <Select variant='filled'/>
        <Button
          minW="100%"
          colorScheme="blue"
          onClick={() => console.log("button on clikc here..")}
        >
          確認結帳
        </Button>
      </Stack>
    </>
  );
};

export default OrderDetail;
