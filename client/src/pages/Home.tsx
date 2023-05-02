import MainSearchBar from '../components/MainSearchBar'
import { Box, Container, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'


const Home = () => {
  return (
    <Container maxW="990px" >
      <MainSearchBar />
      <Heading size='md' mb='10px'>Recently viewed</Heading>
      <SimpleGrid minChildWidth='10px' spacing='10px' mb={'50px'}>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://loremflickr.com/640/480/concerts' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://loremflickr.com/640/480/concerts' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://loremflickr.com/640/480/concerts' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://loremflickr.com/640/480/concerts' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
      </SimpleGrid>
      <Heading size='md' mb='10px'>Top Concerts</Heading>
      <SimpleGrid minChildWidth='10px' spacing='10px' mb={'50px'}>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
      </SimpleGrid>
      <Heading size='md' mb='10px'>Top Sports</Heading>
      <SimpleGrid minChildWidth='10px' spacing='10px' mb={'50px'}>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://images.pexels.com/photos/264279/pexels-photo-264279.jpeg' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://images.pexels.com/photos/264279/pexels-photo-264279.jpeg' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://images.pexels.com/photos/264279/pexels-photo-264279.jpeg' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
        <Box height='170px' mb={'30px'}>
          <Image boxSize='200px' mb={'10px'} borderRadius={'10px'} src='https://images.pexels.com/photos/264279/pexels-photo-264279.jpeg' alt='Dan Abramov' />
          <Heading as='h5' size='sm'>
            some event
          </Heading>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Home
