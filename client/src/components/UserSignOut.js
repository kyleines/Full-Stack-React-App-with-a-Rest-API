import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import Context from "../Context";

const UserSignOut = () => {
    const context = useContext(Context.AppContext);
    context.actions.signOut();

    return (
        <Redirect to="/" />
    );
}
export default UserSignOut;