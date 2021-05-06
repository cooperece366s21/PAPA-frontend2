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
                    as="button"
                    p={4}
                    // color="white"
                    fontWeight="bold"
                    borderRadius="md"
                    bgGradient="linear(to-r, teal.500,green.500)"
                    _hover={{
                        bgClip: "text",
                        bgGradient: "linear(to-l, #7928CA,#FF0080)"

                        // background:
                        //
                        //     linear-gradient(to bottom, #fff, #bbb) content-box,
                        //
                        // linear-gradient(to right, #e94332, #a91302) padding-box,
                        //
                        // linear-gradient(to right, #0867a6, #4aa9e8) border-box;"
                    }}

                >
                    Get Recommendation
                    {/*<ArrowRightIcon w={3} h={3} color="red.500" />*/}

                </Button>

                <Box>
                    <Heading as="h2" size="2xl">
                        {recommendation?.name}
                    </Heading>

                </Box>

                <Box>
                    <Heading as="h2" size="2xl">
                        {/*{recommendation?.address.address1}*/}
                        {/*{recommendation?.address.address2}*/}
                        {/*{recommendation?.address.address3}*/}
                        {/*{recommendation?.address.address1}*/}
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