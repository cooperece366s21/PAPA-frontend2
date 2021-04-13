import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import React from "react";
import api from "../../services/api";

export type LikeProps = { onLike: () => void };
export type LikeState = { loading: boolean };

export class Like extends React.Component<LikeProps, LikeState>{
    state: LikeState = {
        loading: false
    };

    render() {
        return (
            <Button
                isLoading={this.state.loading}
                onClick={() => this.onClick()}
                type="submit"

            >

                {<ArrowRightIcon w={5} h={5} color="red.500" />}

            </Button>
        );
    }

    async onClick() {
        this.setState({ loading: true });
        await api.Like();
        this.setState({ loading: false });
        this.props.onLike();
    }

}