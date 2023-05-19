import {
  FormHelperText,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  FormControl,
  Center
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useCookies } from 'react-cookie'

const MainSearchBar = () => {
  const [cookies] = useCookies(['user'])

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
        <InputGroup mb={'30px'}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            maxWidth="100%"
            type="tel"
            placeholder="Search an event, artist or team"
          />
        </InputGroup>
        <HStack>
          {cookies.user ?
            <Link width="100px" href=" https://chakra-ui.com">
              My Account
            </Link>
            :
            <Link width="70px" href="http://localhost:5173/login">
              Sign In
            </Link>
          }
        </HStack>
      </HStack >
    </>
  )
}

export default MainSearchBar
