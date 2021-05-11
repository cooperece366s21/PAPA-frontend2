import {
    Flex,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from "@chakra-ui/react";
import React from "react";

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
        );
    }
}