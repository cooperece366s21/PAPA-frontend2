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
// import api, { User } from "../../services/api";
import api, { Lobby } from "../../services/api";

type LobbyProps = { onEnterLobby: (lobby: Lobby) => void };

type LobbyJoinState = {
    lobby: string;
    lobbyResponse: string | null;
    loading: boolean;
};

export class JoinLobby extends React.Component<LobbyProps, LobbyJoinState> {
    state = {
        lobby: "",
        lobbyResponse: null,
        loading: false
    };

    async onSubmit() {
        this.setState({ loading: true });

        const { onEnterLobby } = this.props;
        const { lobby } = this.state;

        const result = await api.JoinLobby(lobby);

        if (result.status === "success") {
            onEnterLobby(result.value);
        } else {
            this.setState({ lobbyResponse: result.error });
        }

        this.setState({ loading: false });
    }

    render() {
        const { lobbyResponse } = this.state;

        return (
            <Flex width="full" align="center" justifyContent="center">
                <Box p={2}>
                    <Box textAlign="center">
                        <Heading
                            fontWeight={400}
                            fontSize={{ base: '2xl', sm: '4xl', md: '8xl' }}
                            size="4x1"
                            lineHeight={'110%'}
                            color='red.800'
                        >
                            Join Lobby
                        </Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form onSubmit={e => e.preventDefault()}>
                            {lobbyResponse && (
                                <Heading as="h2" size="2xl">
                                    {this.state.lobbyResponse}
                                </Heading>
                            )}
                            <FormControl>
                                <FormLabel>Lobby Code</FormLabel>
                                <Input
                                    type="code"
                                    placeholder="abcedf"
                                    focusBorderColor="black.300"
                                    // errorBorderColor="red.300"
                                    value={this.state.lobby}
                                    bg=''
                                    onChange={e => this.setState({ lobby: e.currentTarget.value })}
                                />
                            </FormControl>

                            <Button
                                width="full"
                                mt={4}
                                type="submit"
                                bg='red.200'
                                isLoading={this.state.loading}
                                onClick={() => this.onSubmit()}
                            >
                                Join
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
            // <Box>
            //     <form onSubmit={e => e.preventDefault()}>
            //         {lobbyResponse && (
            //             <Heading as="h2" size="2xl">
            //                 {this.state.lobbyResponse}
            //             </Heading>
            //         )}
            //         <FormControl id="lobby" isRequired>
            //             <FormLabel>Lobby</FormLabel>
            //             <Input
            //                 type=""
            //                 value={this.state.lobby}
            //                 onChange={e => this.setState({ lobby: e.currentTarget.value })}
            //             />
            //         </FormControl>
            //
            //         <Button
            //             type="submit"
            //             isLoading={this.state.loading}
            //             onClick={() => this.onSubmit()}
            //         >
            //             Enter
            //         </Button>
            //     </form>
            // </Box>
        );
    }
}






/*
import {
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
import api, { Lobby } from "../../services/api";

type LoginProps = { onLoggedIn: (lobby: Lobby) => void };

type LobbyJoinState = {
    code: string;
    loginResponse: string | null;
    loading: boolean;
};

export class Login extends React.Component<LoginProps, LobbyJoinState> {
    state = {
        lobbycode: "",
        lobbyResponse: null,
        loading: false
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

    render() {
        const { loginResponse } = this.state;

        return (



            <Box>
                <form onSubmit={e => e.preventDefault()}>
                    {loginResponse && (
                        <Heading as="h2" size="2xl">
                            {this.state.loginResponse}
                        </Heading>
                    )}
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type=""
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.currentTarget.value })}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.currentTarget.value })}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        isLoading={this.state.loading}
                        onClick={() => this.onSubmit()}
                    >
                        Sign in
                    </Button>
                </form>
            </Box>
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
}*/
