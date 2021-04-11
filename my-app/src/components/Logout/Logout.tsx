import { Button } from "@chakra-ui/react";
import React from "react";
import api from "../../services/api";

export type LogoutProps = { onLoggedOut: () => void };
export type LogoutState = { loading: boolean };

export class Logout extends React.Component<LogoutProps, LogoutState> {
    state: LogoutState = {
        loading: false
    };

    render() {
        return (
            <Button
                isLoading={this.state.loading}
                onClick={() => this.onClick()}
                type="submit"
            >
                Logout
            </Button>
        );
    }

    async onClick() {
        this.setState({ loading: true });
        await api.logout();
        this.setState({ loading: false });
        this.props.onLoggedOut();
    }
}