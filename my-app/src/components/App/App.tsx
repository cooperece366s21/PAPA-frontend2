import React from "react";
import "./App.css";
import api, { User,Lobby } from "../../services/api";
import { Login } from "../Login/Login";
import { JoinLobby } from "../Lobby/joinLobby";
import { CreateLobby } from "../Lobby/CreateLobby";
import { LeaveLobby } from "../Lobby/leaveLobby";

import { End } from "../Lobby/End";
import { Logout } from "../Logout/Logout";
import { Preference } from "../Preferences/Preference";



import {
    Box,
    Heading,
    Stack,
    HStack,
    Center,
    Text,
    Container
} from "@chakra-ui/react";


import {LobbyFeed} from "../Lobby/LobbyFeed";

type AppProps = {};
type AppState = { user: User | null, lobby: Lobby |null, restIdx: number};

class App extends React.Component<AppProps, AppState> {
  state: AppState = { user: null , lobby: null, restIdx: 0};

  async componentDidMount() {
    const currentUser = await api.getCurrentUser();
    this.setState({ user: currentUser });

    const currentLobby = await api.getCurrentLobby();
    this.setState({user: currentUser, lobby: currentLobby});

  }

  render() {
    const { user } = this.state;
    // const { lobbyHost } = this.state;
    const { lobby } = this.state;
    return (

         <Box className="App"
             w="100%"
             h="2000px"
             bgGradient="linear(red.600 0%, orange.400 5%, yellow.300 20%)"

         >

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
                            PAPA Will Help You Decide!
                        </Text>
                    </Heading>
                </Stack>
            </Container>

          <Box bg='blue.300'>


            {user === null ? (
                <Login onLoggedIn={user => this.setState({ user: user, lobby: null })} />
            ) : (
                <Box>

                    <Container maxW={'1xl'}>
                        <Stack
                            as={Box}

                            spacing={{ base: 4, md: 7 }}
                            py={{ base: 10, md: 18 }}>
                            {lobby == null && (<Heading
                                fontWeight={400}
                                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                                lineHeight={'110%'}>
                                Hello <Box color='green.600' fontWeight="extrabold" fontSize="6xl"> {user.name}</Box>Join or create a lobby!

                            </Heading>)}
                        </Stack>
                    </Container>

                    <Box>
                    {lobby == null ? (
                        <CreateLobby onEnterLobby={lobby => this.setState({ user: user , lobby: lobby })} />

                        ) : (
                            <Box>
                                <Text
                                    color="black.300"

                                    fontSize="3xl"
                                    fontWeight="extrabold"
                                    textAlign={'left'}
                                >
                                    Welcome to lobby with code: <Box color='green.600' fontWeight="extrabold" fontSize="6xl"> {lobby.code}</Box><br/>
                                </Text>

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


                            </HStack>
</Center>

                                <End onEnded={() => this.setState({ user: user , lobby: lobby })} />
                                <Box

                                >

                                    <LeaveLobby onLeftLobby={() => this.setState({user: user, lobby: null })} />
                                </Box>
                            </Box>

                    )}

                    {lobby == null ? (
                        <JoinLobby onEnterLobby={lobby => this.setState({ user: user , lobby: lobby })} />
                    ) : (
                        <Box>


                        </Box>
                    )}

                    </Box>

                    <Box>
                        <Logout onLoggedOut={() => this.setState({ user: null, lobby: null })} />
                    </Box>
                </Box>

            )}

          </Box>

        </Box>
    );
  }
}

export default App;