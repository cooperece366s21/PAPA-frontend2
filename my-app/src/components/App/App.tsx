import React from "react";
import "./App.css";
import api, { User,Lobby } from "../../services/api";
import { Login } from "../Login/Login";
import { JoinLobby } from "../Lobby/joinLobby";
import { LeaveLobby } from "../Lobby/leaveLobby";
import { Logout } from "../Logout/Logout";
// import { UserFeed } from "../Feed/Feed";
import { Box, Heading, Stack } from "@chakra-ui/react";

// props ~ inputs that don't change
// state ~ internal and can change
type AppProps = {};
type AppState = { user: User | null, lobby: Lobby |null};

class App extends React.Component<AppProps, AppState> {
  state: AppState = { user: null , lobby: null};

  async componentDidMount() {
    const currentUser = await api.getCurrentUser();
    this.setState({ user: currentUser });

    const currentLobby = await api.getCurrentLobby();
    this.setState({ user: currentUser, lobby: currentLobby});
  }

  render() {
    const { user } = this.state;
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
            {user === null ? (
                <Login onLoggedIn={user => this.setState({ user })} />
            ) : (
                <Box>
                  <span>Hello {user.username}</span>
                  <Logout onLoggedOut={() => this.setState({ user: null })} />
                    <Box>
                    {lobby == null ? (
                        <JoinLobby onEnterLobby={lobby => this.setState({ user: user , lobby: lobby })} />
                        ) : (
                            <Box>
                                <span>Welcome to lobby with code: {lobby.code}</span>
                                <LeaveLobby onLeftLobby={() => this.setState({ lobby: null })} />

                            </Box>
                    )}
                  {/*<UserFeed />*/}

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





