
import {Box, Heading, HStack, VStack, Button, ButtonGroup, Divider, Image, Center, Text} from "@chakra-ui/react";
import { MinusIcon, AddIcon} from '@chakra-ui/icons';
import React from "react";
import api, {Feed, GetRestaurantList, Restaurant, GetUrls,setCurrentRestaurant} from "../../services/api";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
} from "@chakra-ui/react"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react"

type FeedState = {
    feed: Restaurant[] | null;
    users: String[] | null;
    urls: string[] | null;
    // currentIdx: number | null
};

type FeedProps = { currentIdx: number };

export class LobbyFeed extends React.Component<FeedProps, FeedState> {

    state: FeedState = {
        feed: null,
        users: null,
        urls : null
    };

    componentDidUpdate() {

        api.setCurrentRestaurant((this.state.feed && this.state.feed.length > this.props.currentIdx) ? this.state.feed[this.props.currentIdx].ID:null);

    }

    async componentDidMount() {
        const feed = await api.GetRestaurantList();
        const users = await api.GetUserList();
        const urls = await  api.GetUrls();


        this.setState({ feed: feed, users: users, urls: urls});

        api.setCurrentRestaurant((feed && feed.length > this.props.currentIdx) ? feed[this.props.currentIdx].ID:null);
    }

    render() {

        const { feed } = this.state;
        const { users } = this.state;
        const { urls } = this.state;
        const address = (feed && feed.length > this.props.currentIdx && JSON.parse(feed[this.props.currentIdx].address));


        return (
            <VStack>


                <Box>
                    <Center>
                        {feed && feed.length > this.props.currentIdx &&  (<Text
                            // bgGradient="linear(to-l, #7928CA,#FF0080)"
                            color="black.300"
                            // bgClip="text"
                            fontSize="5xl"
                            fontWeight="extrabold"
                            textAlign={'right'}
                        >
                            Please Like or Dislike
                        </Text>)}
                    </Center>

                    {feed && feed.length > this.props.currentIdx && (<Center>
                            <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                {feed && feed.length > this.props.currentIdx &&  (
                                    <Image boxSize="450px" src= {urls ? urls[this.props.currentIdx]:"https://hpc.cimne.upc.edu/wp-content/uploads/2013/04/done.gif"} />)}

                                <Box p="6">
                                    <Box d="flex" alignItems="baseline">

                                        <Box
                                            color="gray.500"
                                            fontWeight="semibold"
                                            letterSpacing="wide"
                                            fontSize="xs"
                                            textTransform="uppercase"
                                            ml="2"
                                        >

                                        </Box>
                                    </Box>


                                    <Box
                                        mt="1"
                                        fontWeight="semibold"
                                        as="h4"
                                        lineHeight="tight"
                                        //isTruncated
                                    >


                                        <Accordion allowMultiple>

                                            <AccordionItem p="6">
                                                {({ isExpanded }) => (
                                                    <>
                                                        <h2>
                                                            <AccordionButton >
                                                                <Box flex="1" textAlign="left" fontSize="40px">
                                                                    <Heading fontSize="40px">
                                                                        {feed && feed.length > this.props.currentIdx && (feed[this.props.currentIdx].name)}

                                                                    </Heading>

                                                                </Box>
                                                                {isExpanded ? (
                                                                    <MinusIcon fontSize="20px" />
                                                                ) : (
                                                                    <AddIcon fontSize="20px" />
                                                                )}
                                                            </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4} >

                                                            Price: {feed && feed.length > this.props.currentIdx && feed[this.props.currentIdx].price}
                                                            <Divider />
                                                            Rating: {feed && feed.length > this.props.currentIdx && feed[this.props.currentIdx].rating}
                                                            <Divider />
                                                            Address: <> </>

                                                            {feed && feed.length > this.props.currentIdx && (
                                                                JSON.parse(feed[this.props.currentIdx].address).display_address[0])}
                                                                 <> </>
                                                            {feed && feed.length > this.props.currentIdx && (
                                                                JSON.parse(feed[this.props.currentIdx].address).display_address[1])}
                                                            <> </>
                                                            {feed && feed.length > this.props.currentIdx && ((JSON.parse(feed[this.props.currentIdx].address).display_address).length > 2 &&
                                                                JSON.parse(feed[this.props.currentIdx].address).display_address[2])}
                                                            <Divider />
                                                            Phone Number: {feed && feed.length > this.props.currentIdx && feed[this.props.currentIdx].displayPhone}
                                                        </AccordionPanel>
                                                    </>
                                                )}
                                            </AccordionItem>
                                        </Accordion>




                                    </Box>


                                    <Box d="flex" mt="2" alignItems="center">


                                    </Box>
                                </Box>
                            </Box>
                        </Center>)}



                        {feed && feed.length-1 < this.props.currentIdx &&  (<Heading as="h2" size="2xl">No More Options!</Heading>)}
                </Box>

            </VStack>
        );
    }
}