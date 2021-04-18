
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import api, {Feed, GetRestaurantList, Restaurant, setCurrentRestaurant} from "../../services/api";

type FeedState = {
    feed: string[] | null;
    // currentIdx: number | null
};

type FeedProps = { currentIdx: number };

export class LobbyFeed extends React.Component<FeedProps, FeedState> {

    state: FeedState = {
        feed: null
    };

    componentDidUpdate() {
        //console.log(this.state.feed ? this.state.feed[this.props.currentIdx]:null)
        api.setCurrentRestaurant(this.state.feed ? this.state.feed[this.props.currentIdx]:null);
    }

    async componentDidMount() {
        // const feed = await api.GetRestaurantList();
        const feed = await api.GetRestaurantList();
        console.log(feed)
        //debugger;
        this.setState({ feed: feed});

        api.setCurrentRestaurant(feed ? feed[this.props.currentIdx]:null);


    }

    // async  onSelected() {
    //     this.state()
    // }

    render() {

        const { feed } = this.state;
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
                <span>The list of restaurants in the lobby:</span>


                {feed?.map((restaurant, idx) => (
                        <Box key={idx}>
                            <span>{restaurant}</span>
                            {/*<Heading as="h2" size="2xl">*/}
                            {/*    {restaurant}*/}
                            {/*</Heading>*/}
                {/*        /!*<HStack spacing="24px">*!/*/}
                {/*        /!*    {Restaurant.info.map((info, itemIdx) => (*!/*/}
                {/*        /!*        <Box bg="pink.100" key={itemIdx}>*!/*/}
                {/*        /!*            <p>{info.name}</p>*!/*/}
                {/*        /!*            <p>{info.price && info.rating}</p>*!/*/}
                {/*        /!*        </Box>*!/*/}
                {/*        /!*    ))}*!/*/}
                {/*        /!*</HStack>*!/*/}
                    </Box>
                ))}
                {/*if({feed && feed.length > this.props.currentIdx}){*/}
                {/*    <Heading as="h2" size="2xl">Please like or dislike</Heading>*/}
                {/*}*/}
                {/*else {*/}
                {/*    <Heading as="h2" size="2xl">No More Options</Heading>*/}
                {/*}*/}
                <Heading as="h2" size="2xl">Please like or dislike</Heading>
                <Box>
                    <Heading as="h2" size="2xl">

                        {feed && feed.length > this.props.currentIdx && feed[this.props.currentIdx] }
                    </Heading>
                </Box>
            </VStack>
        );
    }
}