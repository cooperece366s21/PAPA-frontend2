import React from "react";
import "./App.css";
import api, { User } from "../../services/api";
import { Login } from "../Login/Login";
import { joinLobby } from "../Lobby/joinLobby";
import { Logout } from "../Logout/Logout";
// import { UserFeed } from "../Feed/Feed";
import { Box, Heading, Stack } from "@chakra-ui/react";

// props ~ inputs that don't change
// state ~ internal and can change
type AppProps = {};
type AppState = { user: User | null };

class App extends React.Component<AppProps, AppState> {
  state: AppState = { user: null };

  async componentDidMount() {
    const currentUser = await api.getCurrentUser();
    this.setState({ user: currentUser });
  }

  render() {
    const { user } = this.state;
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
                  <span>Hello {user.name}</span>
                  <Logout onLoggedOut={() => this.setState({ user: null })} />
                  {/*<UserFeed />*/}
                </Box>

            )}
          </Box>

            <Box>

            </Box>
        </Box>
    );
  }
}

export default App;





