import { Button, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import React from "react";
import api, {Restaurant} from "../../services/api";

export type EndProps = { onEnded: () => void };
export type EndState = { loading: boolean, recommendation: Restaurant | null };


export class End extends React.Component<EndProps, EndState>{
    state: EndState = {
        loading: false,
        recommendation: null
    };



    render() {
        const { recommendation } = this.state;
        return (
            <VStack>

                <Button
                    isLoading={this.state.loading}
                    onClick={() => this.onClick()}
                    type="submit"
                >
                    Get Recommendation
                    {/*<ArrowRightIcon w={3} h={3} color="red.500" />*/}

                </Button>

                <Box>
                    <Heading as="h2" size="2xl">
                        {recommendation?.id}
                    </Heading>
                </Box>
            </VStack>
        );

    }

    async onClick() {
        this.setState({ loading: true });
        const restaurant = await api.getRecommendation();
        this.setState({ loading: false, recommendation: restaurant });
        this.props.onEnded();
    }

}