import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import React from "react";
import api from "../../services/api";

export type DislikeProps = { onDislike: () => void };
export type DislikeState = { loading: boolean };

export class Dislike extends React.Component<DislikeProps, DislikeState>{
    state: DislikeState = {
        loading: false
    };

    render() {
        return (
            <Button
                isLoading={this.state.loading}
                onClick={() => this.onClick()}
                type="submit"
                // w={5} h={5}
            >
                <ArrowLeftIcon w={5} h={5} color="red.500" />

            </Button>
        );
    }

    async onClick() {
        this.setState({ loading: true });
        await api.Dislike();
        this.setState({ loading: false });
        this.props.onDislike();
    }
}