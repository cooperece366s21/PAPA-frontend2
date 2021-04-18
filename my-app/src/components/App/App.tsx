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

// import { UserFeed } from "../Feed/Feed";
import { Box, Heading, Stack } from "@chakra-ui/react";
import {LobbyFeed} from "../Lobby/LobbyFeed";
import {Like} from "../Preferences/Like";
import {Dislike} from "../Preferences/Dislike";

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
        <Box className="App">
          <Stack spacing={6}>
            <Heading as="h1" size="4xl">
              PAPA
            </Heading>
            <Heading as="h2" size="2xl">
              TEST
            </Heading>
          </Stack>
          <Box>
              <span>If you are a new user, please enter the username and password that you would like and then click sign up. After this just simple click sign in.<br/> </span>
              <span>If you are a returning user, please enter your username and password and click sign in.<br/></span>
              <span>If you want to change your username or password, please enter the username and password that you would like and then click sign up. <br/></span>
            {user === null ? (
                <Login onLoggedIn={user => this.setState({ user: user, lobby: null })} />
            ) : (
                <Box>
                  <span>Hello {user.ID}</span>
                  {/*<Logout onLoggedOut={() => this.setState({ user: null })} />*/}
                    <Box>
                    {lobby == null ? (
                        <CreateLobby onEnterLobby={lobby => this.setState({ user: user , lobby: lobby })} />
                        // && <JoinLobby onEnterLobby={lobby => this.setState({ user: user , lobby: lobby })} />
                        ) : (
                            <Box>
                                <span>Welcome to lobby with code: {lobby.code}</span>
                                <Box>
                                    <LeaveLobby onLeftLobby={() => this.setState({user: user, lobby: null })} />
                                </Box>

                                {/*{<GetRestaurantList />}*/}
                                <LobbyFeed currentIdx={this.state.restIdx}/>

                                {<Start onStarted={() => this.setState({ user: user , lobby: lobby })} />}
                                <Box>
                                    <span>SOME RESTAURANT OPTION</span>
                                </Box>
                                <Box>
                                    {/*{<Dislike onDislike={() => this.setState({ user: user , lobby: lobby })} />}*/}
                                    {/*<span>      </span>*/}
                                    {/*{<Like onLike={() => this.setState({ user: user , lobby: lobby })} />}*/}
                                    {<Preference isDislike={true} onClick={() => this.setState({ user: user , lobby: lobby, restIdx: this.state.restIdx+1 })} />}
                                    <span>      </span>
                                    {<Preference isDislike={false} onClick={() => this.setState({ user: user , lobby: lobby, restIdx: this.state.restIdx+1 })} />}
                                </Box>

                                {<End onEnded={() => this.setState({ user: user , lobby: lobby })} />}

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

                    <Box>
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





