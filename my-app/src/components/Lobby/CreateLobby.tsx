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
// import api, { User } from "../../services/api";
import api, { Lobby } from "../../services/api";

type LobbyProps = { onEnterLobby: (lobby: Lobby) => void };

type LobbyJoinState = {
    // lobby: string;
    location: string;
    lobbyResponse: string | null;
    loading: boolean;
};

export class CreateLobby extends React.Component<LobbyProps, LobbyJoinState> {
    state = {
        // lobby: "",
        location: "",
        lobbyResponse: null,
        loading: false
    };

    async onSubmit() {
        this.setState({ loading: true });

        const { onEnterLobby } = this.props;
        // const { lobby } = this.state;
        const { location } = this.state;

        const result = await api.JoinLobby(location);
        //const result = await api.CreateLobby(location);

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
            <Box>
                <form onSubmit={e => e.preventDefault()}>
                    {lobbyResponse && (
                        <Heading as="h2" size="2xl">
                            {this.state.lobbyResponse}
                        </Heading>
                    )}
                    <FormControl id="lobby" isRequired>
                        <FormLabel>To create a lobby please enter a location (for now just type in the code)</FormLabel>
                        <Input
                            type=""
                            value={this.state.location}
                            onChange={e => this.setState({ location: e.currentTarget.value })}
                        />
                    </FormControl>

                    {/*<FormControl id="location" isRequired>*/}
                    {/*    <FormLabel>To create a lobby please enter a location (for now just type in the code)</FormLabel>*/}
                    {/*    <Input*/}
                    {/*        type=""*/}
                    {/*        value={this.state.location}*/}
                    {/*        onChange={e => this.setState({ location: e.currentTarget.value })}*/}
                    {/*    />*/}
                    {/*</FormControl>*/}

                    <Button
                        type="submit"
                        isLoading={this.state.loading}
                        onClick={() => this.onSubmit()}
                    >
                        Enter
                    </Button>
                </form>
            </Box>
        );
    }
}

