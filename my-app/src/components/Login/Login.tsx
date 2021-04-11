import {
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
import api, { User } from "../../services/api";

type LoginProps = { onLoggedIn: (user: User) => void };

type LoginState = {
    username: string;
    password: string;
    loginResponse: string | null;
    loading: boolean;
};

export class Login extends React.Component<LoginProps, LoginState> {
    state = {
        username: "",
        password: "",
        loginResponse: null,
        loading: false
    };

    async onSubmit() {
        this.setState({ loading: true });

        const { onLoggedIn } = this.props;
        const { username, password } = this.state;

        const result = await api.login(username, password);

        if (result.status === "success") {
            onLoggedIn(result.value);
        } else {
            this.setState({ loginResponse: result.error });
        }

        this.setState({ loading: false });
    }

    render() {
        const { loginResponse } = this.state;

        return (
            <Box>
                <form onSubmit={e => e.preventDefault()}>
                    {loginResponse && (
                        <Heading as="h2" size="2xl">
                            {this.state.loginResponse}
                        </Heading>
                    )}
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type=""
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.currentTarget.value })}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.currentTarget.value })}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        isLoading={this.state.loading}
                        onClick={() => this.onSubmit()}
                    >
                        Sign in
                    </Button>
                </form>
            </Box>
        );
    }
}

function PasswordInput() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size="md">
            <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}