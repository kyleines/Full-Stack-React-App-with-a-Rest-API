
// import modules
import React, {useContext, useEffect} from "react";
import {Redirect} from "react-router-dom";
import Context from "../Context";

// handles removal of user credentials from global state
const UserSignOut = () => {

    // data
    const context = useContext(Context.AppContext);

    // calls signout method
    useEffect(() => {
        context.actions.signOut();
    }, [context.actions]);    

    return (
        <Redirect to="/" />
    );
}
export default UserSignOut;