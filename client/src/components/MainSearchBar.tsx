import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import UserContext from '../contexts/userContext'
import { useContext } from 'react'

const MainSearchBar = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext)

  console.log("GETTING CONTEXT: ", currentUser)

  return (
    <HStack>
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
          maxWidth="500px"
          type="tel"
          placeholder="Search an event, artist or team"
        />
      </InputGroup>
      <HStack>
        <Link width="30px" href="https://chakra-ui.com">
          Sell
        </Link>
        <Link width="80px" href="https://chakra-ui.com">
          My Tickets
        </Link>
        <Link width="70px" href="http://localhost:5173/login">
          Sign In
        </Link>
      </HStack>
    </HStack>
  )
}

export default MainSearchBar
