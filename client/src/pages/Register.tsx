import { Button, Center, Container, FormControl, FormHelperText, FormLabel, Image, Input, Link, Stack } from "@chakra-ui/react"


export const Register = () => {
    return (
        <>
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
                            <FormLabel>Create an account</FormLabel>
                        </Stack>
                    </Center>
                    <Input marginBottom={'10px'} type='text' placeholder='First name' />
                    <Input marginBottom={'10px'} type='text' placeholder='Last name' />
                    <Input marginBottom={'10px'} type='email' placeholder='Email address' />
                    <Input marginBottom={'10px'} type='password' placeholder='Password' />
                    <Center>
                        <Button marginBottom={'10px'}>Register</Button>
                    </Center>
                    <Center>
                        <Stack>
                            <FormHelperText textAlign={'center'}>
                                By signing in or creating an account, you acknowledge and accept our privacy policy.
                            </FormHelperText>
                            <FormHelperText textAlign={'center'}>
                                Already have an account? <Link href='http://localhost:5173/login' fontWeight={'bold'}>Sign in.</Link>
                            </FormHelperText>
                        </Stack>
                    </Center>
                </FormControl>
            </Container>
        </>
    )
}
