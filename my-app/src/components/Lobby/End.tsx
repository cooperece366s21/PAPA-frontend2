import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import React from "react";
import api from "../../services/api";

export type EndProps = { onEnded: () => void };
export type EndState = { loading: boolean };

export class End extends React.Component<EndProps, EndState>{
    state: EndState = {
        loading: false
    };

    render() {
        return (
            <Button
                isLoading={this.state.loading}
                onClick={() => this.onClick()}
                type="submit"
            >
                Get Recommendation
                {/*<ArrowRightIcon w={3} h={3} color="red.500" />*/}

            </Button>
        );
    }

    async onClick() {
        this.setState({ loading: true });
        await api.getRecommendation();
        this.setState({ loading: false });
        this.props.onEnded();
    }

}