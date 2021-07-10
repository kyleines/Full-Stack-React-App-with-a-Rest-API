
// import modules
import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import ValidationErrors from "./ValidationErrors";
import Context from "../Context";

// authenticates existing user
const UserSignIn = () => {

    // data
    const context = useContext(Context.AppContext);

    // url manipulation
    const history = useHistory();

    // state variables
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    // errors array for field validation
    const [errors, setErrors] = useState([]);

    // sets state from html input fields
    const change = (e) => {
        const value = e.target.value;

        switch (e.target.name) {
            case "emailAddress":
                setEmailAddress(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // fetches user data
        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    setErrors(["Sign-in was unsuccessful"]);
                } else {
                    const {from} = history.location.state || {from: history.goBack()};
                    history.push(from);
                }
            })
            .catch(() => history.push("/error"));
    }

    // returns user to home "/" route
    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <ValidationErrors errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={change} value={emailAddress} />
                    <label>Password</label>
                    <input id="password" name="password" type="password" onChange={change} value={password} />
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    );
}
export default UserSignIn;