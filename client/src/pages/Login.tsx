import { Button, Center, Container, FormControl, FormHelperText, FormLabel, Image, Input, Link, Stack } from "@chakra-ui/react"

export const Login = () => {
    return (
        <Container width={'450px'}>
            <FormControl>
                <Center>
                    <Stack marginBottom={'20px'}>

                        <Image
                            boxSize="100px"
                            borderRadius={'10px'}
                            src="https://img.vggcdn.net/images/Assets/Icons/bfx/stubhub-logo-merch-purple-mweb.440b3765.svg"
                            alt=""
                        />
                        <FormLabel>Sign in to StubHub</FormLabel>
                    </Stack>
                </Center>
                <Input marginBottom={'10px'} type='email' placeholder='Email address' />
                <Input marginBottom={'10px'} type='password' placeholder='Password' />
                <Center>
                    <Button marginBottom={'10px'}>Sign in</Button>
                </Center>
                <Center>
                    <Stack>
                        <FormHelperText textAlign={'center'}>
                            By signing in or creating an account, you acknowledge and accept our privacy policy.
                        </FormHelperText>
                        <FormHelperText textAlign={'center'}>
                            New to StubHub? <Link href='http://localhost:5173/register' fontWeight={'bold'}>Create an account.</Link>
                        </FormHelperText>
                    </Stack>
                </Center>
            </FormControl>
        </Container>
    )
}
