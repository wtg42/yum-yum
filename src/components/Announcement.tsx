import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react";

const Announcement = () => {
  return (
    <Card>
      <CardHeader>
        <Text fontSize="2rem" color="tomato">
          Hi, This is an Announcement....
          這邊可以寫一些公告。
        </Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="1rem">
          OK, here is your show up here...
        </Text>
      </CardBody>
      <CardFooter fontSize="1.25rem">
        <Text>Finally, write the footer information here.</Text>
      </CardFooter>
    </Card>
  );
};

export default Announcement;
