import { Button, Center, Container, FormControl, FormHelperText, FormLabel, Image, Input, Link, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const INITIAL_USER_INFO_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const Register = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(INITIAL_USER_INFO_STATE)

  const handleRegisterInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [event.target.name]: event.target.value
    }))
  }

  const handleRegisterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios
      .post('http://localhost:3345/users', userInfo)
      .then(function (response) {
        if (response) {
          console.log(response)
        }
      })
  }

  return (
    <>
      <Container
        width={'450px'}>
        <FormControl>
          <Center>
            <Stack
              marginBottom={'20px'}>
              <Link href='http://localhost:5173'>
                <Image
                  boxSize="100px"
                  borderRadius={'10px'}
                  src="https://img.vggcdn.net/images/Assets/Icons/bfx/stubhub-logo-merch-purple-mweb.440b3765.svg"
                  alt=""
                />
              </Link>
              <FormLabel>Create an account</FormLabel>
            </Stack>
          </Center>
          <Input
            marginBottom={'10px'}
            type='text'
            onChange={handleRegisterInfo}
            name="firstName"
            placeholder='First name' />
          <Input
            marginBottom={'10px'}
            type='text'
            onChange={handleRegisterInfo}
            name="lastName"
            placeholder='Last name' />
          <Input
            marginBottom={'10px'}
            type='email'
            onChange={handleRegisterInfo}
            name="email"
            placeholder='Email address' />
          <Input
            marginBottom={'10px'}
            type='password'
            onChange={handleRegisterInfo}
            name="password"
            placeholder='Password' />
          <Center>
            <Button
              onClick={handleRegisterClick}
              marginBottom={'10px'}
            >
              Register
            </Button>
          </Center>
          <Center>
            <Stack>
              <FormHelperText
                textAlign={'center'}>
                By signing in or creating an account, you acknowledge and accept our privacy policy.
              </FormHelperText>
              <FormHelperText
                textAlign={'center'}>
                Already have an account?
                <Link
                  href='http://localhost:5173/login'
                  fontWeight={'bold'}
                >
                  Sign in.
                </Link>
              </FormHelperText>
            </Stack>
          </Center>
        </FormControl>
      </Container>
    </>
  )
}
