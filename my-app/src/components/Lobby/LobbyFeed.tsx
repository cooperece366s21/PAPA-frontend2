
import {Box, Heading, HStack, VStack, Button, ButtonGroup, Image, Center, Text} from "@chakra-ui/react";
import { MinusIcon, AddIcon} from '@chakra-ui/icons';
import React from "react";
import api, {Feed, GetRestaurantList, Restaurant, setCurrentRestaurant} from "../../services/api";
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
    // currentIdx: number | null
};

type FeedProps = { currentIdx: number };

export class LobbyFeed extends React.Component<FeedProps, FeedState> {

    state: FeedState = {
        feed: null,
        users: null
    };

    componentDidUpdate() {
        //console.log(this.state.feed ? this.state.feed[this.props.currentIdx]:null)
        api.setCurrentRestaurant((this.state.feed && this.state.feed.length > this.props.currentIdx) ? this.state.feed[this.props.currentIdx].ID:null);
        //api.GetUserList();
        //api.GetRestaurantInfo((this.state.feed && this.state.feed.length > this.props.currentIdx) ? this.state.feed[this.props.currentIdx].ID:null);
        //this.setState({users: users, info: info });
    }

    async componentDidMount() {
        // const feed = await api.GetRestaurantList();
        const feed = await api.GetRestaurantList();
        const users = await api.GetUserList();

        //console.log(feed)
        // debugger;
        this.setState({ feed: feed, users: users});

        api.setCurrentRestaurant((feed && feed.length > this.props.currentIdx) ? feed[this.props.currentIdx].ID:null);

    }

    // async  onSelected() {
    //     this.state()
    // }

    render() {

        const { feed } = this.state;
        const { users } = this.state;
        //const info = api.GetRestaurantInfo((feed && feed.length > this.props.currentIdx) ? feed[this.props.currentIdx].ID:null);
        // const split1 = info?.split("image_url");
        // const url = split1[1].split(":\");
        // if (feed == null){
        //     const { restaurant } = null;
        // } else {
        //     const { restaurant } = feed[this.props.currentIdx];
        // }
        // const { restaurant } = feed?[this.props.currentIdx];
        // debugger;
        // api.setCurrentRestaurant(feed ? feed[this.props.currentIdx].id:null);

        return (
            <VStack>
                {/*{feed?.map((restaurant, idx) =>())}*/}
                {/*<span>The list of restaurants in the lobby:</span>*/}


                {/*{feed?.map((restaurant, idx) => (*/}
                {/*        <Box key={idx}>*/}
                {/*            <Text*/}
                {/*                bgGradient="linear(to-l, #7928CA,#FF0080)"*/}
                {/*                bgClip="text"*/}
                {/*                fontSize="3xl"*/}
                {/*                fontWeight="extrabold"*/}
                {/*                textAlign={'center'}*/}
                {/*            >*/}
                {/*                */}
                {/*                {restaurant.name}<br/>*/}

                {/*            </Text>*/}
                {/*            /!*<*!/*/}
                {/*            /!*<Heading as="h2" size="2xl">*!/*/}
                {/*            /!*    {restaurant}*!/*/}
                {/*            /!*</Heading>*!/*/}
                {/*/!*        /!*<HStack spacing="24px">*!/*!/*/}
                {/*/!*        /!*    {Restaurant.info.map((info, itemIdx) => (*!/*!/*/}
                {/*/!*        /!*        <Box bg="pink.100" key={itemIdx}>*!/*!/*/}
                {/*/!*        /!*            <p>{info.name}</p>*!/*!/*/}
                {/*/!*        /!*            <p>{info.price && info.rating}</p>*!/*!/*/}
                {/*/!*        /!*        </Box>*!/*!/*/}
                {/*/!*        /!*    ))}*!/*!/*/}
                {/*/!*        /!*</HStack>*!/*!/*/}
                {/*    </Box>*/}
                {/*))}*/}
                {/*if({feed && feed.length > this.props.currentIdx}){*/}
                {/*    <Heading as="h2" size="2xl">Please like or dislike</Heading>*/}
                {/*}*/}
                {/*else {*/}
                {/*    <Heading as="h2" size="2xl">No More Options</Heading>*/}
                {/*}*/}
                {/*<Heading as="h2" size="2xl">Please like or dislike</Heading>*/}


                <Text
                    // bgGradient="linear(to-l, #7928CA,#FF0080)"
                    color="black.300"
                    // bgClip="text"
                    fontSize="3xl"
                    fontWeight="extrabold"
                    textAlign={'right'}
                >
                    The list of users in the lobby:
                </Text>
                 {users?.map((string, idx) => (
                     <Box key={idx}>
                         <Text
                             // bgGradient="linear(to-l, #7928CA,#FF0080)"
                             color="black.300"
                             // bgClip="text"
                             fontSize="2xl"
                             fontWeight="extrabold"
                             textAlign={'right'}
                         >
                            <span>{users[idx]}</span>
                         </Text>
                     </Box>
                ))}
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
                    <Box boxSize="sm">
                        {feed && feed.length > this.props.currentIdx &&  (<Image src="https://media-cdn.tripadvisor.com/media/photo-s/1a/66/ed/b1/photo0jpg.jpg"  />)}
                    </Box>
                        {/*<Heading as="h2" size="2xl" >*/}


                        {/*    {feed && feed.length > this.props.currentIdx && (feed[this.props.currentIdx].name)}*/}

                        {/*</Heading>*/}

                    <Accordion allowMultiple>

                        <AccordionItem >
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton fontSize="50px">
                                            <Box flex="1" textAlign="left" fontSize="50px">
                                                {feed && (feed[this.props.currentIdx].name)}
                                            </Box>
                                            {isExpanded ? (
                                                <MinusIcon fontSize="12px" />
                                            ) : (
                                                <AddIcon fontSize="12px" />
                                            )}
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} fontSize="50px">
                                        Phone Number: {feed && feed[this.props.currentIdx].displayPhone}
                                        Price: {feed && feed[this.props.currentIdx].price}
                                        Rating: {feed && feed[this.props.currentIdx].rating}
                                        Address: {feed && feed[this.props.currentIdx].address.address1}
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                    </Accordion>

 {/*
                            <Popover>
                                <PopoverTrigger>
                                    <Button colorScheme="red" variant = "outline" size="lg">

                                        <Text

                                            // bgGradient="linear(to-l, #7928CA,#FF0080)"
                                            bgClip="text"
                                            fontSize="3xl"
                                            fontWeight="extrabold"
                                            textAlign={'center'}
                                        >

                                            {feed && feed.length > this.props.currentIdx && (feed[this.props.currentIdx].name)}<br/>
                                        </Text>
                                    </Button>


                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>{feed && (feed[this.props.currentIdx].name)}</PopoverHeader>
                                    <PopoverBody>{feed && feed[this.props.currentIdx].cuisines}</PopoverBody>
                                    <PopoverBody>
                                        <Box bg="tomato">
                                            <Text
                                                noOfLines={[1, 2, 3, 4]}


                                                bgClip="text"
                                                fontSize="3xl"
                                                fontWeight="extrabold"
                                                textAlign={'center'}
                                                border="1px"
                                                borderColor="green.200"
                                            >
                                            Phone Number: {feed && feed[this.props.currentIdx].displayPhone}
                                            Price: {feed && feed[this.props.currentIdx].price}
                                            Rating: {feed && feed[this.props.currentIdx].rating}
                                            Address: {feed && feed[this.props.currentIdx].address.address1}
                                            </Text>
                                        </Box>
                                    </PopoverBody>



                                </PopoverContent>
                            </Popover>
*/}
                            {/**/}

                                {/*{</Heading>*!/*/}
                        {feed && feed.length-1 < this.props.currentIdx &&  (<Heading as="h2" size="2xl">No More Options!</Heading>)}
                </Box>

            </VStack>
        );
    }
}