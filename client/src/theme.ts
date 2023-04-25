import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { MultiSelectTheme } from 'chakra-multiselect'

const config: ThemeConfig = {
  initialColorMode: 'dark'
}

const theme = extendTheme({
  config,
  components: {
    MultiSelect: MultiSelectTheme
  }
})

export default theme
