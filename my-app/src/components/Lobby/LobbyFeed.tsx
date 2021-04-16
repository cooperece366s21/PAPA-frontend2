
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import api, {Feed, GetRestaurantList} from "../../services/api";

type FeedState = {
    feed: Feed | null;
};

type FeedProps = {};

export class LobbyFeed extends React.Component<FeedProps, FeedState> {
    state: FeedState = {
        feed: null
    };

    async componentDidMount() {
        // const feed = await api.GetRestaurantList();
        const feed = await api.GetRestaurantList();
        this.setState({ feed: feed });
    }

    render() {

        const { feed } = this.state;
        return (
            <VStack>
                {feed &&
                    feed.restaurants.map((restaurant, idx) => (
                        <Box key={idx}>
                            <Heading as="h2" size="2xl">
                                {restaurant.id}
                            </Heading>
                        {/*<HStack spacing="24px">*/}
                        {/*    {Restaurant.info.map((info, itemIdx) => (*/}
                        {/*        <Box bg="pink.100" key={itemIdx}>*/}
                        {/*            <p>{info.name}</p>*/}
                        {/*            <p>{info.price && info.rating}</p>*/}
                        {/*        </Box>*/}
                        {/*    ))}*/}
                        {/*</HStack>*/}
                    </Box>
                ))}
            </VStack>
        );
    }
}