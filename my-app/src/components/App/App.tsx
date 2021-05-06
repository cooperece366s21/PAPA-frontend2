import React from "react";
import "./App.css";
import api, { User,Lobby } from "../../services/api";
import { Login } from "../Login/Login";
import { JoinLobby } from "../Lobby/joinLobby";
import { CreateLobby } from "../Lobby/CreateLobby";
import { LeaveLobby } from "../Lobby/leaveLobby";
import { Start } from "../Lobby/Start";
import { End } from "../Lobby/End";
import { Logout } from "../Logout/Logout";
import { Preference} from "../Preferences/Preference";

import { extendTheme } from "@chakra-ui/react"

import {
    Box,
    Heading,
    Stack,
    VStack,
    HStack,
    Center,
    Text,
    Button,
    Icon,
    useColorModeValue,
    Container
} from "@chakra-ui/react";

// const theme = extendTheme({
//     textStyles: {
//         h1: {
//             // you can also use responsive styles
//             fontSize: ["48px", "72px"],
//             fontWeight: "bold",
//             lineHeight: "110%",
//             letterSpacing: "-2%",
//         },
//         h2: {
//             fontSize: ["36px", "48px"],
//             fontWeight: "semibold",
//             lineHeight: "110%",
//             letterSpacing: "-1%",
//         },
//     },
// })

import {LobbyFeed} from "../Lobby/LobbyFeed";
import {Like} from "../Preferences/Like";
import {Dislike} from "../Preferences/Dislike";
// import Head from 'next/head';



// props ~ inputs that don't change
// state ~ internal and can change
type AppProps = {};
type AppState = { user: User | null, lobby: Lobby |null, restIdx: number};

class App extends React.Component<AppProps, AppState> {
  state: AppState = { user: null , lobby: null, restIdx: 0};

  async componentDidMount() {
    const currentUser = await api.getCurrentUser();
    this.setState({ user: currentUser });

    const currentLobby = await api.getCurrentLobby();
    this.setState({user: currentUser, lobby: currentLobby});
    // const currentLobbyID = await api.getCurrentLobbyId();
    // const currentLobbyList = await api.GetRestaurantList();
    // this.setState({ user: currentUser, lobby: {id: currentLobby, code: currentLobby, restaurant_maps:currentLobbyList}});
  }

  render() {
    const { user } = this.state;
    // const { lobbyHost } = this.state;
    const { lobby } = this.state;
    return (
      //   w="100%"
      // h ="2000px"
      // bgGradient="linear(red.600 2%, orange.400 10%, yellow.300 50%)"

            // bgGradient="radial(gray.300,yellow.400,pink.200)" w="100%" h ="2000px"
 //         <Box>
 //
 //         </Box>
         <Box className="App"
             w="100%"
             h="2000px"
             bgGradient="linear(red.600 0%, orange.400 5%, yellow.300 20%)"

         >
            {/*<Heading>*/}
            {/*    <link*/}
            {/*        href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"*/}
            {/*        rel="stylesheet"*/}
            {/*    />*/}
            {/*</Heading>*/}
            {/*inear(red.600 2%, orange.400 10%, yellow.300 50%)"*/}
            {/* w="100%"*/}
            {/* h="200px"*/}

             <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}>
                    <Heading
                        fontWeight={400}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        // fontFamily={"Raleway"}
                        color={'green.900'}
                        lineHeight={'110%'}>
                        Welcome to PAPA! <br />
                        <Text as={'span'} color={'green.900'}>
                            {/*fontWeight={400}*/}
                            {/*fontFamily={"Raleway"}*/}
                            PAPA Will Help You Decide!
                        </Text>
                    </Heading>
                </Stack>
            </Container>

          <Box bg='blue.300'>

              {/*{user == null && (<span>If you are a new user, please enter the username and password that you would like and then click sign up. After this just simple click sign in.<br/> </span>)}*/}
              {/*{user == null && (<span>If you are a returning user, please enter your username and password and click sign in.<br/></span>)}*/}
              {/*{user == null && (<span>If you want to change your username or password, please enter the username and password that you would like and then click sign up. <br/></span>)}*/}
            {user === null ? (
                <Login onLoggedIn={user => this.setState({ user: user, lobby: null })} />
            ) : (
                <Box>
                  {/*<span>Hello {user.name}</span>*/}
                    <Container maxW={'1xl'}>
                        <Stack
                            as={Box}
                            //textAlign={'top'}
                            spacing={{ base: 4, md: 7 }}
                            py={{ base: 10, md: 18 }}>
                            {lobby == null && (<Heading
                                fontWeight={400}
                                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                                lineHeight={'110%'}>
                                Hello <Box color='green.600' fontWeight="extrabold" fontSize="6xl"> {user.name}</Box>Join or create a lobby!
                                {/*<Text as={'span'} color={'green.400'}>*/}
                                {/*    /!*fontWeight={400}*!/*/}
                                {/*    Hello {user.name}, join or create a lobby!*/}
                                {/*</Text>*/}
                            </Heading>)}
                        </Stack>
                    </Container>

                  {/*<Logout onLoggedOut={() => this.setState({ user: null })} />*/}
                    <Box>
                    {lobby == null ? (
                        <CreateLobby onEnterLobby={lobby => this.setState({ user: user , lobby: lobby })} />
                        // && <JoinLobby onEnterLobby={lobby => this.setState({ user: user , lobby: lobby })} />
                        ) : (
                            <Box>
                                <Text
                                    // bgGradient="linear(to-l, #7928CA,#FF0080)"
                                    color="black.300"
                                    // bgClip="text"
                                    fontSize="3xl"
                                    fontWeight="extrabold"
                                    textAlign={'left'}
                                >
                                    Welcome to lobby with code: <Box color='green.600' fontWeight="extrabold" fontSize="6xl"> {lobby.code}</Box><br/>
                                </Text>
                                {/*<span>Welcome to lobby with code: {lobby.code}<br/></span>*/}
                                {/*<span>Please click on start when everyone is ready!</span>*/}
                                {/*<Box>*/}
                                {/*    <LeaveLobby onLeftLobby={() => this.setState({user: user, lobby: null })} />*/}
                                {/*</Box>*/}

                                {/*{<GetRestaurantList />}*/}
                                {/*<Center>*/}
                                {/*    {<Start onStarted={() => this.setState({ user: user , lobby: lobby })} />}*/}
                                {/*</Center>*/}



<Center>


<HStack>
<Box>
    {<Preference isDislike={true} onClick={() => this.setState({ user: user , lobby: lobby, restIdx: this.state.restIdx+1 })} />}
</Box>
<Box>
    <LobbyFeed currentIdx={this.state.restIdx}/>
</Box>

                              <Box>
                                  {<Preference isDislike={false} onClick={() => this.setState({ user: user , lobby: lobby, restIdx: this.state.restIdx+1 })} />}
                              </Box>


        {/*                        <LobbyFeed currentIdx={this.state.restIdx}/>

                                <Box>
                                    {<Dislike onDislike={() => this.setState({ user: user , lobby: lobby })} />}
                                    <span>      </span>
                                    {<Like onLike={() => this.setState({ user: user , lobby: lobby })} />}
                                    {api.setCurrentRestaurant(feed ? feed[this.state.restIdx].id:null)}
                                    <Center>
                                        {<Preference isDislike={true} onClick={() => this.setState({ user: user , lobby: lobby, restIdx: this.state.restIdx+1 })} />}
                                        {<Preference isDislike={false} onClick={() => this.setState({ user: user , lobby: lobby, restIdx: this.state.restIdx+1 })} />}
                                    </Center>
                                </Box>*/}
                            </HStack>
</Center>





                                <End onEnded={() => this.setState({ user: user , lobby: lobby })} />
                                <Box
                                    // as="button"
                                    // p={4}
                                    // // color="white"
                                    // fontWeight="bold"
                                    // borderRadius="md"
                                    // bgGradient="linear(to-r, teal.500,green.500)"
                                    // _hover={{
                                    //     bgGradient: "linear(to-r, red.500, yellow.500)",
                                    // }}
                                >

                                    <LeaveLobby onLeftLobby={() => this.setState({user: user, lobby: null })} />
                                </Box>
                            </Box>

                    )}

                    {lobby == null ? (
                        <JoinLobby onEnterLobby={lobby => this.setState({ user: user , lobby: lobby })} />
                    ) : (
                        <Box>
                            {/*<span>Welcome to lobby with code: {lobby.code}</span>*/}
                            {/*<Box>*/}
                            {/*    <LeaveLobby onLeftLobby={() => this.setState({user: user, lobby: null })} />*/}
                            {/*</Box>*/}

                            {/*/!*{<GetRestaurantList />}*!/*/}
                            {/*/!*<LobbyFeed />*!/*/}

                            {/*/!*{<Start onStarted={() => this.setState({ user: user , lobby: lobby })} />}*!/*/}
                            {/*<Box>*/}
                            {/*    <span>SOME RESTAURANT OPTION</span>*/}
                            {/*</Box>*/}
                            {/*<Box>*/}
                            {/*    {<Dislike onDislike={() => this.setState({ user: user , lobby: lobby })} />}*/}
                            {/*    <span>      </span>*/}
                            {/*    {<Like onLike={() => this.setState({ user: user , lobby: lobby })} />}*/}
                            {/*</Box>*/}

                            {/*/!*{<End onEnded={() => this.setState({ user: user , lobby: lobby })} />}*!/*/}

                        </Box>
                    )}


                  {/*<UserFeed />*/}

                    </Box>

                    <Box
                         // as="button"
                         // p={4}
                         // // color="white"
                         // fontWeight="bold"
                         // borderRadius="md"
                         // bgGradient="linear(to-r, teal.500,green.500)"
                         // _hover={{
                         //     bgGradient: "linear(to-r, red.500, yellow.500)",
                         // }}
                        >
                        <Logout onLoggedOut={() => this.setState({ user: null, lobby: null })} />
                    </Box>
                </Box>

            )}

          </Box>

            {/*<Box>*/}

            {/*    <Box>*/}
            {/*        <span>Enter Lobby Code: </span>*/}
            {/*        <JoinLobby onEnterLobby={() => this.setState({ })} />*/}
            {/*        <UserFeed />*/}
            {/*    </Box>*/}

            {/*</Box>*/}
        </Box>
    );
  }
}

export default App;