
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import api, {GetRestaurantList, getLobbyFeed, Restaurant, Feed} from "../../services/api";

type RestaurantState = {
    feed: Feed | null;
};

type FeedProps = {};

export class LobbyFeed extends React.Component<FeedProps, RestaurantState> {
    state: RestaurantState = {
        feed: null
    };

    async componentDidMount() {
        // const feed = await api.GetRestaurantList();
        const feed = await api.getLobbyFeed();
        this.setState({ feed: feed });
    }

    render() {
        const { feed } = this.state;
        return (
            <VStack>
                {/*{feed &&*/}
                {/*    feed.restaurants.=> (*/}
                {/*    <Box>*/}

                {/*    </Box>*/}
                {/*)}*/}
                {/*{feed &&*/}
                {/*feed.restaurants.map((Restaurant, idx) => (*/}
                {/*    <Box key={idx}>*/}
                {/*        <Heading as="h2" size="2xl">*/}
                {/*            {Restaurant.name}*/}
                {/*        </Heading>*/}
                {/*        <HStack spacing="24px">*/}
                {/*            {Restaurant.info.map((info, itemIdx) => (*/}
                {/*                <Box bg="pink.100" key={itemIdx}>*/}
                {/*                    <p>{info.name}</p>*/}
                {/*                    <p>{info.price && info.rating}</p>*/}
                {/*                </Box>*/}
                {/*            ))}*/}
                {/*        </HStack>*/}
                {/*    </Box>*/}
                {/*))}*/}
            </VStack>
        );
    }
}