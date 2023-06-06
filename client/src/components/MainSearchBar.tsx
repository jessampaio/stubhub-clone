import {
  FormHelperText,
  HStack,
  Image,
  Link,
  FormControl,
  Center
} from '@chakra-ui/react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Select, { components, DropdownIndicatorProps } from 'react-select'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";


interface EventsAndParticipants {
  id: string;
  name: string;
  type: string;
}

const MainSearchBar = () => {
  const [cookies] = useCookies(['user'])
  const [searchOptions, setSearchOptions] = useState<any>([])

  const navigate = useNavigate()

  const getEventsAndParticipants = () => {
    axios
      .get('http://localhost:3345/events/eventsandparticipants')
      .then((response) => {
        if (response) {
          console.log(response)
          const options = response.data.map((option: EventsAndParticipants) => {
            return {
              label: option.name,
              value: option.id,
              type: option.type
            }
          })
          setSearchOptions(options)
        }
      })
  }

  const handleSearchBar = (event: any) => {
    console.log(event)
    if (event.type === 'event') {
      navigate(`/events/${event.value}`)
    }
    if (event.type === 'participant') {
      navigate(`/participant/${event.value}`)
    }
  }

  const styles = {
    control: (base: any) => ({
      ...base,
      minWidth: '925px',
      flexDirection: 'row-reverse'
    })
  }

  useEffect(() => {
    getEventsAndParticipants()
  }, [])

  const DropdownIndicator = (
    props: DropdownIndicatorProps
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <BsSearch />
      </components.DropdownIndicator>
    );
  };

  return (
    <>
      <FormControl>
        <Center>
          <FormHelperText>StubHub is the world's top destination for ticket buyers and resellers. Prices may be higher or lower than face value.
          </FormHelperText>
        </Center>
      </FormControl>
      <HStack height={'140px'}>
        <Image
          boxSize="100px"
          mb={'10px'}
          borderRadius={'10px'}
          src="https://img.vggcdn.net/images/Assets/Icons/bfx/stubhub-logo-merch-purple-mweb.440b3765.svg"
          alt=""
        />
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
          options={searchOptions}
        />
        <HStack>
          {cookies.user
            ? <Link width="100px" href="http://localhost:5173/my-account">
              My Account
            </Link>
            : <Link width="70px" href="http://localhost:5173/login">
              Sign In
            </Link>
          }
        </HStack>
      </HStack>
    </>
  )
}

export default MainSearchBar
