import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import Context from "../Context";

const UserSignUp = () => {

    const context = useContext(Context.AppContext);
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

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

        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        if (confirmPassword !== password) {
            setErrors(["Passwords do not match"]);
        } else {
            context.data.createUser(user)
                .then(errors => {
                    if (errors.length) {
                        setErrors(errors);
                    } else {
                        context.actions.signIn(emailAddress, password)
                            .then(() => {
                                history.push("/");
                                console.log("Sign-up was successful!")
                            });
                    }
                })
                .catch(error => {
                    console.log(error);
                    history.push("/error");
                });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        console.log(context)
        history.push("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <ErrorsDisplay errors={errors} />
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