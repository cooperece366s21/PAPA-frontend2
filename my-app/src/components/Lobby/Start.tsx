import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import React from "react";
import api from "../../services/api";

export type StartProps = { onStarted: () => void };
export type StartState = { loading: boolean };

export class Start extends React.Component<StartProps, StartState>{
    state: StartState = {
        loading: false
    };

    render() {
        return (
            <Button
                isLoading={this.state.loading}
                onClick={() => this.onClick()}
                type="submit"
                >
                Start Lobby
                {/*<ArrowRightIcon w={3} h={3} color="red.500" />*/}

            </Button>
        );
    }

    async onClick() {
        this.setState({ loading: true });
        await api.initLobby();
        this.setState({ loading: false });
        this.props.onStarted();
    }

}