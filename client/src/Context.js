import React, {Component} from "react";
import Data from "./Data";
import Cookies from "js-cookie";

export const AppContext = React.createContext();

export class Provider extends Component {

    constructor() {
        super();
        this.data = new Data();
    }

    state = {
        authedUser: Cookies.getJSON("authedUser") || null,
    }

    render() {
        const {authedUser} = this.state;
        const value =  {
            authedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            },
        };

        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        );
    }

    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);

        if (user !== null) {
            this.setState(() => {
                return {authedUser: user}
            });

            Cookies.set(
                "authedUser",
                JSON.stringify(user),
                {expires: 1},
            );
        }

        return user;
    }

    signOut() {
        this.setState(() => {
            return {
                authedUser: null,
            }
        });

        Cookies.remove("authedUser");
    }
}
export const Consumer = AppContext.Consumer;


// context wrapper
export function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <AppContext.Consumer>
                {context => <Component {...props} context={context} />}
            </AppContext.Consumer>
        );
    }
}

export default {withContext, AppContext};