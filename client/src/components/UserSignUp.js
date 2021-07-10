
// import modules
import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import ValidationErrors from "./ValidationErrors";
import Context from "../Context";

// displays form for new user creation
const UserSignUp = () => {

    // data
    const context = useContext(Context.AppContext);

    // url manipulation
    const history = useHistory();

    // state variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // errors array for field validation
    const [errors, setErrors] = useState([]);

    // sets state from html input fields
    const change = (e) => {
        const value = e.target.value;

        switch (e.target.name) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "emailAddress":
                setEmailAddress(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // user data to be persisted to database
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        // password confirmation
        if (confirmPassword !== password) {
            setErrors(["Passwords do not match"]);
        } else {
            // posts data to database
            context.data.createUser(user)
                .then(errors => {
                    if (errors.length) {
                        setErrors(errors);
                    } else {
                        // signs in new user
                        context.actions.signIn(emailAddress, password)
                            .then(() => {
                                const {from} = history.location.state || {from: history.goBack()};
                                history.push(from);
                            });
                    }
                })
                .catch(() => history.push("/error"));
        }
    }

    // returns users to default "/" route
    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <ValidationErrors errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input id="firstName" name="firstName" type="text" onChange={change} value={firstName} />

                    <label>Last Name</label>
                    <input id="lastName" name="lastName" type="text" onChange={change} value={lastName} />

                    <label>Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={change} value={emailAddress} />

                    <label>Password</label>
                    <input id="password" name="password" type="password" onChange={change} value={password} />

                    <label>Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" onChange={change} value={confirmPassword} />

                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    );
}
export default UserSignUp;