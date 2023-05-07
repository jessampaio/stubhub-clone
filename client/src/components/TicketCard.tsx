import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  CardFooter,
  Button,
  Box
} from '@chakra-ui/react'

const TicketCard = () => {
  return (
    <Box overflowY="auto" maxHeight="600px">
      <Card
        overflowY="auto"
        maxHeight="300px"
        direction={{ base: 'column', sm: 'row' }}
        variant="outline"
      >
        <Stack>
          <CardBody>
            <Heading size="md">$10</Heading>

            <Text py="2">info about ticket</Text>
          </CardBody>

          <CardFooter>
            <Button variant="solid" colorScheme="purple">
              Buy Ticket
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  )
}

export default TicketCard
