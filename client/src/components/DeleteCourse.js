
// import modules
import React, {useState, useEffect, useContext} from "react";
import {Redirect, useParams, useHistory} from "react-router-dom";
import ValidationErrors from "./ValidationErrors";
import Context from "../Context";

// handles course deletion
const DeleteCourse = () => {

    // data
    const context = useContext(Context.AppContext);
    const signedIn = context.authedUser;

    // url manipulation
    const history = useHistory();
    const {id} = useParams();

    // state variables
    const [courseTitle, setCourseTitle] = useState("");
    const [inputTitle, setInputTitle] = useState("");

    // errors array for field validation
    const [errors, setErrors] = useState([]);

    // fetches course data for:
    // user authorization check and deletion confirmation
    useEffect(() => {
        context.data.getCourseDetails(id)
            .then(res => {
                if (!res) {
                    history.push("/notfound");
                // only authorized users (courses' creators) can delete courses
                } else if (res && res.userId === signedIn.id) {
                    setCourseTitle(res.title);
                } else {
                    history.push("/forbidden");
                }
            })
    }, [id, signedIn.id, context.data, history]);

    // sets state from html input field
    const change = (e) => {
        const value = e.target.value;
        setInputTitle(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // users must input course's title for deletion confirmation
        if (inputTitle !== "/" + courseTitle) {
            setErrors(["Confirmation text does not match"])
        } else {
            // posts deletion to database
            context.data.deleteCourse(id, signedIn.emailAddress, signedIn.password)
                .then(errors => {
                    if (errors.length) {
                        setErrors(errors);
                    } else {
                        history.push("/");
                    }
                })
                .catch(() => history.push("/error"));
        }
    }

    // returns user to previous page (course details)
    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        signedIn ? (
            <div className="wrap">
                <h2>Are you sure you want to delete this course?</h2>
                <ValidationErrors errors={errors} />
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