import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import React from "react";
import api from "../../services/api";

export type LikeProps = { onClick: () => void, isDislike: boolean };
export type LikeState = { loading: boolean };

export class Preference extends React.Component<LikeProps, LikeState>{
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
                {this.props.isDislike && (<ArrowLeftIcon w={5} h={5} color="red.500" />)}

                {!this.props.isDislike && (<ArrowRightIcon w={5} h={5} color="green.500" />)}


            </Button>


        );
    }

    async onClick() {
        this.setState({ loading: true });
        if (this.props.isDislike){
            await api.Dislike();
        } else {
            await api.Like();
        }

        this.setState({ loading: false });
        this.props.onClick();
    }

}