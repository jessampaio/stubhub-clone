import { Fragment } from 'react'
import EventBox from '../components/EventBox'
import MainSearchBar from '../components/MainSearchBar'
import { Container, Heading, SimpleGrid } from '@chakra-ui/react'

const events = [
  {
    category: 'sports',
    heading: 'Top Sports'
  },
  {
    category: 'concerts',
    heading: 'Top Concerts'
  },
  {
    category: 'testing1',
    heading: 'Theater & Comedy'
  }
]

const Home = () => {
  return (
    <Container maxW="1300px">
      <MainSearchBar />

      {/* <Heading size='md' mb='10px'>Recently viewed</Heading>
      <SimpleGrid minChildWidth='10px' spacing='30px' mb={'50px'}>
        <EventBox />
      </SimpleGrid> */}

      {events.map((event, idx) => (
        <Fragment key={idx}>
          <Heading size="md" mb="10px">
            {event.heading}
          </Heading>
          <SimpleGrid minChildWidth="150px" spacing="30px" mb={'50px'}>
            <EventBox category={event.category} />
          </SimpleGrid>
        </Fragment>
      ))}
    </Container>
  )
}

export default Home
