
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import api, {Feed, GetRestaurantList, Restaurant} from "../../services/api";

type FeedState = {
    feed: Restaurant[] | null;
    currentIdx: number | null
};

type FeedProps = { };

export class LobbyFeed extends React.Component<FeedProps, FeedState> {
    state: FeedState = {
        feed: null,
        currentIdx: null
    };

    async componentDidMount() {
        // const feed = await api.GetRestaurantList();
        const feed = await api.GetRestaurantList();
        //debugger;
        this.setState({ feed: feed , currentIdx: 0});

    }

    // async  onSelected() {
    //     this.state()
    // }

    render() {

        const { feed, currentIdx } = this.state;
        return (
            <VStack>
                {/*{feed?.map((restaurant, idx) => (*/}
                {/*        <Box key={idx}>*/}
                {/*            <Heading as="h2" size="2xl">*/}
                {/*                {restaurant}*/}
                {/*            </Heading>*/}
                {/*        /!*<HStack spacing="24px">*!/*/}
                {/*        /!*    {Restaurant.info.map((info, itemIdx) => (*!/*/}
                {/*        /!*        <Box bg="pink.100" key={itemIdx}>*!/*/}
                {/*        /!*            <p>{info.name}</p>*!/*/}
                {/*        /!*            <p>{info.price && info.rating}</p>*!/*/}
                {/*        /!*        </Box>*!/*/}
                {/*        /!*    ))}*!/*/}
                {/*        /!*</HStack>*!/*/}
                {/*    </Box>*/}
                {/*))}*/}
                <Box>
                    <Heading as="h2" size="2xl">
                        {feed && feed[currentIdx??0].id}
                    </Heading>
                </Box>
            </VStack>
        );
    }
}