import {
    Flex,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import React from "react";
// import api, { User } from "../../services/api";
import api, { Lobby } from "../../services/api";

type LobbyProps = { onEnterLobby: (lobby: Lobby) => void };

type LobbyJoinState = {
    // lobby: string;
    location: string;
    keyword: string;
    lobbyResponse: string | null;
    loading: boolean;
};

export class CreateLobby extends React.Component<LobbyProps, LobbyJoinState> {
    state = {
        // lobby: "",
        location: "",
        keyword:"",
        lobbyResponse: null,
        loading: false
    };

    async onSubmit() {
        this.setState({ loading: true });

        const { onEnterLobby } = this.props;
        // const { lobby } = this.state;
        const { location } = this.state;
        const { keyword } = this.state;

        //const result = await api.JoinLobby(location);
        const result = await api.CreateLobby(location,keyword);

        if (result.status === "success") {
            onEnterLobby(result.value);
        } else {
            this.setState({ lobbyResponse: result.error });
        }

        this.setState({ loading: false });
    }

    render() {
        const { lobbyResponse } = this.state;

        return (
            <Flex width="full" align="center" justifyContent="center">
                <Box p={2}>
                    <Box textAlign="center">
                        <Heading
                            fontWeight={400}
                            fontSize={{ base: '2xl', sm: '4xl', md: '8xl' }}
                            size="4x1"
                            lineHeight={'110%'}
                            color='red.800'
                        >
                            Create Lobby
                        </Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form onSubmit={e => e.preventDefault()}>
                            {lobbyResponse && (
                                <Heading as="h2" size="2xl">
                                    {this.state.lobbyResponse}
                                </Heading>
                            )}
                            <FormControl>
                                <FormLabel>Location</FormLabel>
                                <Input
                                    type="location"
                                    placeholder="nyc"
                                    focusBorderColor="black.300"
                                    // errorBorderColor="red.300"
                                    value={this.state.location}
                                    bg=''
                                    onChange={e => this.setState({ location: e.currentTarget.value })}
                                />
                            </FormControl>
                            <FormControl mt={6}>
                                <FormLabel>Cuisine or Food Type</FormLabel>
                                <Input
                                    type="keyword"
                                    placeholder="Italian"
                                    focusBorderColor="black.300"
                                    //errorBorderColor="red.300"
                                    value={this.state.keyword}
                                    bg=''
                                    onChange={e => this.setState({ keyword: e.currentTarget.value })}
                                />
                            </FormControl>
                            <Button
                                width="full"
                                mt={4}
                                type="submit"
                                bg='red.200'
                                onClick={() => this.onSubmit()}
                            >
                                Create
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
            // <Box>
            //     <form onSubmit={e => e.preventDefault()}>
            //         {lobbyResponse && (
            //             <Heading as="h2" size="2xl">
            //                 {this.state.lobbyResponse}
            //             </Heading>
            //         )}
            //         <FormControl id="location" isRequired>
            //             <FormLabel>Location</FormLabel>
            //             <Input
            //                 type=""
            //                 value={this.state.location}
            //                 onChange={e => this.setState({ location: e.currentTarget.value })}
            //             />
            //         </FormControl>
            //
            //         <FormControl id="Keyword">
            //             <FormLabel>Keyword</FormLabel>
            //             <Input
            //                 type=""
            //                 value={this.state.keyword}
            //                 onChange={e => this.setState({ keyword: e.currentTarget.value })}
            //             />
            //         </FormControl>
            //
            //         <Button
            //             type="submit"
            //             isLoading={this.state.loading}
            //             onClick={() => this.onSubmit()}
            //         >
            //             Enter
            //         </Button>
            //     </form>
            // </Box>
        );
    }
}

