import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import Context from "../Context";

const PrivateRoute = ({component: Component, ...rest}) => {

    const context = useContext(Context.AppContext);

    return (
        <Route 
            {...rest}
            render={props => context.authedUser ? (
                <Component {...props} />
            ) : (
                <Redirect to="/signin" />
            )}
        />
    );
}
export default PrivateRoute;