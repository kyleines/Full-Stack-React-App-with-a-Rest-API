import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import Context from "../Context";

const UserSignIn = () => {

    const context = useContext(Context.AppContext);
    const history = useHistory();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

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

        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    setErrors(["Sign-in was unsuccessful"]);
                } else {
                    console.log("Sign-in was successful!")
                    history.push("/");
                }
            })
            .catch(error => {
                console.log(error);
                history.push("/error");
            });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <ErrorsDisplay errors={errors} />
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

const ErrorsDisplay = ({errors}) => {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => {
                            return (
                                <li key={i}>{error}</li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }

    return errorsDisplay;
}