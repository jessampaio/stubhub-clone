import {
  FormHelperText,
  Image,
  FormControl,
  Container,
  Link,
  Box,
  Flex,
  Hide,
  Show,
  HStack,
  Center,
  Avatar
} from '@chakra-ui/react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Select, { components, DropdownIndicatorProps } from 'react-select'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

// interface EventsAndParticipants {
//   id: string;
//   name: string;
//   type: string;
// }

const MainSearchBar = () => {
  const [cookies] = useCookies(['user'])
  // const [searchOptions, setSearchOptions] = useState<any>([])
  const [search, setSearch] = useState<any>([])

  const navigate = useNavigate()

  // const getEventsAndParticipants = () => {
  //   axios
  //     .get('http://localhost:3350/events/eventsandparticipants')
  //     .then((response) => {
  //       if (response) {
  //         console.log(response)
  //         const options = response.data.map((option: EventsAndParticipants) => {
  //           return {
  //             label: option.name,
  //             value: option.id,
  //             type: option.type
  //           }
  //         })
  //         setSearchOptions(options)
  //       }
  //     })
  // }

  const handleSearchBar = (event: any) => {
    console.log(event)
    if (event.type === 'event') {
      navigate(`/events/${event.value}`)
    }
    if (event.type === 'participant') {
      navigate(`/participant/${event.value}`)
    }
  }

  const handleSearch = (value: any) => {
    console.log(value)

    const searchWords = value

    console.log('the words', searchWords)

    axios
      .post('http://localhost:3350/events/eventsandparticipants', { searchWords })
      .then((response) => {
        if (response) {
          console.log(response)
          const options = response.data.map((option: any) => {
            return {
              label: option.name,
              value: option.id,
              type: option.type
            }
          })
          console.log('setting options')
          setSearch(options)
        }
      })
  }

  //   fetch("http://localhost:3350/graphql", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({ query: "{ query Hello($searchWords: String!) { hello(searchWords: $searchWords )} }", variables: { searchWords } }),
  //   })
  //     .then(r => r.json())
  //     .then(data => console.log("data returned:", data))
  // }

  const styles = {
    control: (base: any) => ({
      ...base,
      borderRadius: '15px',
      flexDirection: 'row-reverse'
    })
  }

  // useEffect(() => {
  //   getEventsAndParticipants()
  // }, [])

  const DropdownIndicator = (
    props: DropdownIndicatorProps
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <BsSearch />
      </components.DropdownIndicator>
    )
  }

  return (
    <Container w='100%' maxW={'1300px'} >
      <Hide below={'md'}>
        <Box w='100%' textAlign={'center'}>
          <FormControl>
            <FormHelperText>StubHub is the world's top destination for ticket buyers and resellers. Prices may be higher or lower than face value.
            </FormHelperText>
          </FormControl>
        </Box>
        <Flex minWidth='max-content' alignItems='center'>
          <Box width={'120px'} paddingRight={'10px'}>
            <Link href='http://localhost:5173'>
              <Image
                boxSize="100px"
                borderRadius={'10px'}
                src="https://img.vggcdn.net/images/Assets/Icons/bfx/stubhub-logo-merch-purple-mweb.440b3765.svg"
                alt=""
              />
            </Link>
          </Box>
          <Box width={'100%'}>
            <Select
              styles={styles}
              placeholder="Search an event, artist or team"
              name="searchBar"
              components={{
                DropdownIndicator,
                IndicatorSeparator: () => null
              }}
              className="basic-single-select"
              classNamePrefix="select"
              onInputChange={(value: any) => handleSearch(value)}
              options={search}
            />
          </Box>
          <Box width='70px' textAlign={'center'}>
            {cookies.user
              ? <Link href='http://localhost:5173/my-account'>
                <Avatar
                  size='md'
                  name={cookies.user.name}
                />
              </Link>
              : <Link href='http://localhost:5173/login'>
                <Avatar
                  size='sm' />
              </Link>
            }
          </Box>
        </Flex>
      </Hide>
      <Show below={'md'}>
        <Box w='100%' textAlign={'center'}>
          <FormControl>
            <FormHelperText fontSize={'10px'}>StubHub is the world's top destination for ticket buyers and resellers. Prices may be higher or lower than face value.
            </FormHelperText>
          </FormControl>
        </Box>
        <Center>
          <Box width={'150px'} paddingRight={'0px'}>
            <HStack>
              <Link href='http://localhost:5173'>
                <Image
                  boxSize="100px"
                  width={'250px'}
                  src="https://img.vggcdn.net/images/Assets/Icons/bfx/stubhub-logo-merch-purple-mweb.440b3765.svg"
                  alt=""
                />
              </Link>
              <Box width='100%' textAlign={'end'}>
                {cookies.user
                  ? <Link href='http://localhost:5173/my-account'>
                    <Avatar
                      size='md'
                      name={cookies.user.name}
                    />
                  </Link>
                  : <Link href='http://localhost:5173/login'>
                    <Avatar
                      size='md'
                    />
                  </Link>
                }
              </Box>
            </HStack>
          </Box>
        </Center>
        <Box width={'100%'} marginBottom={'15px'}>
          <Select
            styles={styles}
            placeholder="Search an event, artist or team"
            name="searchBar"
            components={{
              DropdownIndicator,
              IndicatorSeparator: () => null
            }}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={handleSearchBar}
          // options={searchOptions}
          />
        </Box>
      </Show >
    </Container >
  )
}

export default MainSearchBar
