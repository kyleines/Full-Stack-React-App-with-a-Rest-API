import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import Context from "../Context";

const CreateCourse = () => {

    const context = useContext(Context.AppContext);
    const signedIn = context.authedUser;

    const history = useHistory();

    // minimum data necessary for course creation
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const userId = signedIn.id;

    // optional data
    const [estimatedTime, setTime] = useState("");
    const [materialsNeeded, setMaterials] = useState("");

    // errors array for field validation
    const [errors, setErrors] = useState([]);

    const change = (e) => {
        const value = e.target.value;

        switch (e.target.name) {
            case "courseTitle":
                setTitle(value);
                console.log(value)
                break;
            case "courseDescription":
                setDescription(value);
                console.log(value)
                break;
            case "estimatedTime":
                setTime(value);
                console.log(value)
                break;
            case "materialsNeeded":
                setMaterials(value);
                console.log(value)
                break;
            default:
                return;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };

        if (signedIn) {
            context.data.createCourse(course, signedIn.emailAddress, signedIn.password)
                .then(errors => {
                    if (errors.length) {
                        setErrors(errors);
                    } else {
                        context.data.getCourses()
                            .then(res => {
                                history.push(`/courses/${res.length}`);
                            });
                    }
                })
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label>Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" onChange={change} value={title} />

                            <p>By {`${signedIn.firstName} ${signedIn.lastName}`}</p>

                            <label>Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={change} value={description}></textarea>
                        </div>
                        <div>
                            <label>Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={change} value={estimatedTime} />

                            <label>Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} value={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}
export default CreateCourse;

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