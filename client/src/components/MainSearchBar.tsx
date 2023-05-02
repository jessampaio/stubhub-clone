import { HStack, Image, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/react'

const MainSearchBar = () => {
  return (
    <HStack>
      <Image boxSize='100px'
      mb={'10px'}
      borderRadius={'10px'}
      src='https://img.vggcdn.net/images/Assets/Icons/bfx/stubhub-logo-merch-purple-mweb.440b3765.svg'
      alt='' />
      <InputGroup mb={'30px'}>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input width='500px' type='tel' placeholder='Search an event, artist or team' />
      </InputGroup>
      <HStack>
        <Link width='30px' href='https://chakra-ui.com'>
        Sell
        </Link>
        <Link width='100px' href='https://chakra-ui.com'>
        My Tickets
        </Link>
        <Link width='70px' href='https://chakra-ui.com'>
        Profile
        </Link>
      </HStack>
    </HStack>
  )
}

export default MainSearchBar
