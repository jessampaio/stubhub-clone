import {
  AbsoluteCenter,
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Link,
  Stack
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import UserContext from '../contexts/userContext'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

axios.defaults.withCredentials = true

export const INITIAL_LOGIN_STATE = {
  email: '',
  password: ''
}

interface LoginInfo {
  email: string;
  password: string
}

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>(INITIAL_LOGIN_STATE)
  const { setCurrentUser } = useContext(UserContext)
  const [cookies, setCookies] = useCookies(['user'])

  if (cookies.user) {  // eslint-disable-line
    return ( // eslint-disable-line
      <Navigate to='/' /> // eslint-disable-line
    ) // eslint-disable-line
  } // eslint-disable-line

  const navigate = useNavigate() // eslint-disable-line

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prevLoginInfo: LoginInfo) => ({
      ...prevLoginInfo,
      [event.target.name]: event.target.value
    }
    ))
  }

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios
      .post('http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/login', loginInfo, { withCredentials: true })
      .then(function (response) {
        if (response) {
          console.log('RES: ', response)
          setCurrentUser({
            ...loginInfo
          })
          setCookies('user', { ...loginInfo, name: response.data.fullName, isAdmin: response.data.isAdmin }, { path: '/' })
          navigate('/')
        }
      })
  }


  return (
    <Container position='relative' h={'750px'}>
      <AbsoluteCenter axis='both' width={'450px'}>
        <FormControl>
          <Center>
            <Stack marginBottom={'20px'}>
              <Center>
                <a href='/login'>
                  <Image
                    cursor={'pointer'}
                    boxSize="100px"
                    borderRadius={'10px'}
                    src="https://img.vggcdn.net/images/Assets/Icons/bfx/stubhub-logo-merch-purple-mweb.440b3765.svg"
                    alt='StubHub-Logo'
                  />
                </a>
              </Center>
              <FormLabel>Sign in to StubHub</FormLabel>
            </Stack>
          </Center>
          <Input
            id="email"
            onChange={handleInputChange}
            marginBottom={'10px'}
            name='email'
            type='email'
            placeholder='Email address' />
          <Input
            id="password"
            onChange={handleInputChange}
            marginBottom={'10px'}
            name='password'
            type='password'
            placeholder='Password' />
          <Center>
            <Button
              onClick={handleLogin}
              marginBottom={'10px'}
            >
              Sign in</Button>
          </Center>
          <Center>
            <Stack>
              <FormHelperText textAlign={'center'}>
                By signing in or creating an account, you acknowledge and accept our privacy policy.
              </FormHelperText>
              <FormHelperText textAlign={'center'}>
                New to StubHub? <a href='/register'>Create an account.</a>
              </FormHelperText>
            </Stack>
          </Center>
        </FormControl>
      </AbsoluteCenter>
    </Container>
  )
}
