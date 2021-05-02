import {
    Flex,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import React from "react";
import api, { User } from "../../services/api";

type LoginProps = { onLoggedIn: (user: User) => void };

type LoginState = {
    username: string;
    password: string;
    loginResponse: string | null;
    loading: boolean;
    signUpUser: boolean;
    //signUpUser: User;
};

export class Login extends React.Component<LoginProps, LoginState> {
    state = {
        username: "",
        password: "",
        loginResponse: null,
        loading: false,
        signUpUser: false
    };

    async onSubmit() {
        this.setState({ loading: true });

        const { onLoggedIn } = this.props;
        const { username, password } = this.state;

        const result = await api.login(username, password);

        if (result.status === "success") {
            onLoggedIn(result.value);
        } else {
            this.setState({ loginResponse: result.error });
        }

        this.setState({ loading: false });
    }

    async onSubmitSignUp() {
        this.setState({ loading: true });

        //const { onLoggedIn } = this.props;
        const { username, password } = this.state;

        const user = await api.SignUp(username, password);

        // if (result.status === "success") {
        //     onLoggedIn(result.value);
        // } else {
        //     this.setState({ loginResponse: result.error });
        // }

        // <Heading as="h2" size="1xl">
        //     Great you have signed up {username}! Please sign in above!
        // </Heading>
        this.setState({ loading: false, signUpUser: true });
        //
        //this.setState({ loading: false, signUpUser: user });

    }

    render() {
        const { loginResponse } = this.state;
        //const { signUpUser } = this.state;

        return (

            <Flex width="full" align="center" justifyContent="center">
                <Box p={2}>
                    <Box textAlign="center">
                        <Heading
                            fontWeight={400}
                            fontSize={{ base: '2xl', sm: '4xl', md: '8xl' }}
                            size="8x1"
                            lineHeight={'110%'}
                            color='red.800'
                        >
                            Login or Sign up
                        </Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form onSubmit={e => e.preventDefault()}>
                            {loginResponse && (
                                <Heading as="h2" size="2xl" bg='orange.800'>
                                    {this.state.loginResponse}
                                </Heading>
                            )}
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="username"
                                    placeholder="Ethan"
                                    focusBorderColor="black.300"
                                    // errorBorderColor="red.300"
                                    value={this.state.username}
                                    bg=''
                                    onChange={e => this.setState({ username: e.currentTarget.value })}
                                />
                            </FormControl>
                            <FormControl mt={6}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="*******"
                                    focusBorderColor="black.300"
                                    //errorBorderColor="red.300"
                                    value={this.state.password}
                                    bg=''
                                    onChange={e => this.setState({ password: e.currentTarget.value })}
                                />
                            </FormControl>
                            <Button
                                width="full"
                                mt={4}
                                type="submit"
                                bg='red.200'
                                onClick={() => this.onSubmit()}
                            >
                                Sign In
                            </Button>
                            <Button
                                width="full"
                                mt={4}
                                type="submit"
                                bg ='orange.200'
                                onClick={() => this.onSubmitSignUp()}
                            >
                                Sign Up
                            </Button>

                            <Box>
                                <Heading as="h2" size="1xl" color='orange.800'>
                                    {this.state.signUpUser && (<Heading as="h2" size="1xl">Great you have signed up, {this.state.username}! Please sign in above!</Heading>)}
                                </Heading>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Flex>
            // <Box>
            //     <form onSubmit={e => e.preventDefault()}>
            //         {loginResponse && (
            //             <Heading as="h2" size="2xl">
            //                 {this.state.loginResponse}
            //             </Heading>
            //         )}
            //         <FormControl id="username" isRequired>
            //             <FormLabel>Username</FormLabel>
            //             <Input
            //                 type=""
            //                 value={this.state.username}
            //                 onChange={e => this.setState({ username: e.currentTarget.value })}
            //             />
            //         </FormControl>
            //         <FormControl id="password" isRequired>
            //             <FormLabel>Password</FormLabel>
            //             <Input
            //                 type="password"
            //                 value={this.state.password}
            //                 onChange={e => this.setState({ password: e.currentTarget.value })}
            //             />
            //         </FormControl>
            //         <Button
            //             type="submit"
            //             // isLoading={this.state.loading}
            //             onClick={() => this.onSubmit()}
            //         >
            //             Sign in
            //         </Button>
            //
            //         <Box>
            //             <Button
            //                 type="submit"
            //                 //isLoading={this.state.loading}
            //                 onClick={() => this.onSubmitSignUp()}
            //             >
            //                 Sign up
            //             </Button>
            //
            //             <Box>
            //                 <Heading as="h2" size="1xl">
            //                     {this.state.signUpUser && (<Heading as="h2" size="1xl">Great you have signed up, {this.state.username}! Please sign in above!</Heading>)}
            //                 </Heading>
            //             </Box>
            //
            //         </Box>
            //
            //     </form>
            // </Box>
        );
    }
}

function PasswordInput() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size="md">
            <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}