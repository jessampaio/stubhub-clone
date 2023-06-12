import { Fragment } from 'react'
import { Container, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import EventBox from '../components/EventBox'
import MainSearchBar from '../components/MainSearchBar'

export default function Home(): any {

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

  return (
    <Grid
      templateAreas={{
        base: `
              "main"`
      }}
    >
      <GridItem area="main">
        <Container maxW="1300px" minHeight={'70vh'}>
          {events.map((event, idx) => (
            <Fragment key={idx}>
              <Heading size="md" mb="10px">
                {event.heading}
              </Heading>
              <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 5, xl: 5 }}
                minChildWidth="150px"
                spacing="30px"
                mb={'50px'}>
                <EventBox category={event.category} />
              </SimpleGrid>
            </Fragment>
          ))}
        </Container>
      </GridItem>
    </Grid>

  )
}
