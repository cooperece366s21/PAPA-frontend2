import {Box, Button} from "@chakra-ui/react";
import React from "react";
import api from "../../services/api";

export type LeaveLobbyProps = { onLeftLobby: () => void };
export type LeaveLobbyState = { loading: boolean };

export class LeaveLobby extends React.Component<LeaveLobbyProps, LeaveLobbyState> {
    state: LeaveLobbyState = {
        loading: false
    };

    render() {
        return (
            <Button
                isLoading={this.state.loading}
                onClick={() => this.onClick()}
                type="submit"
                as="button"
                p={4}
                // color="white"
                fontWeight="bold"
                borderRadius="md"
                bgGradient="linear(to-r, teal.500,green.500)"
                _hover={{
                    bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
            >
                Leave
            </Button>
        );
    }

    async onClick() {
        this.setState({ loading: true });
        await api.LeaveLobby();
        this.setState({ loading: false });
        this.props.onLeftLobby();
    }
}