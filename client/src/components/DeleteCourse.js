import React, {useState, useEffect, useContext} from "react";
import {Redirect, useParams, useHistory} from "react-router-dom";
import Context from "../Context";

const DeleteCourse = () => {

    const context = useContext(Context.AppContext);
    const signedIn = context.authedUser;

    const history = useHistory();
    const {id} = useParams();

    const [courseTitle, setCourseTitle] = useState("");
    const [inputTitle, setInputTitle] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        context.data.getCourseDetails(id)
            .then(res => {
                setCourseTitle(res.title);
            })
    }, [id, context.data]);

    const change = (e) => {
        const value = e.target.value;
        setInputTitle(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputTitle !== "/" + courseTitle) {
            setErrors(["Confirmation text does not match"])
            console.log(inputTitle, courseTitle)
        } else {
            
            context.data.deleteCourse(id, signedIn.emailAddress, signedIn.password)
                .then(errors => {
                    if (errors.length) {
                        setErrors(errors);
                    } else {
                        history.push("/");
                    }
                })
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        signedIn ? (
            <div className="wrap">
                <h2>Are you sure you want to delete this course?</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label>Enter "<span style={{color: "#7c689b", fontWeight: "bold"}}>{`/${courseTitle}`}</span>" below to confirm:</label>
                    <input id="courseTitle" name="courseTitle" type="text" onChange={change} value={inputTitle} />

                    <button className="button" type="submit">Delete</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        ) : (
            <Redirect to="/signin" />
        )
    );
}
export default DeleteCourse;

const ErrorsDisplay = ({errors}) => {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div className="validation--errors">
                <h3>Validation errors</h3>
                <ul>
                    {errors.map((error, i) => {
                        return (
                            <li key={i}>{error}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return errorsDisplay;
}