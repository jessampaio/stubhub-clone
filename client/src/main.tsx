import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'
import { RouterProvider } from 'react-router-dom'
import theme from './theme'
import router from './routing/router'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
)
