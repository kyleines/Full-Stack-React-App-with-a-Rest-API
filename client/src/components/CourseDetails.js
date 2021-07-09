import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import Context from "../Context";

const CourseDetails = () => {

    const context = useContext(Context.AppContext);

    const {id} = useParams();
    
    const [course, setCourse] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        context.data.getCourseDetails(id)
            .then(res => {
                setCourse(res)
                setUser(res.user)
            })
    }, [id, context.data]);

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="/courses/:id/update">Update Course</a>
                    <a className="button" href="/courses/:id/delete">Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Details</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {`${user.firstName} ${user.lastName}`}</p>
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.materialsNeeded}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
export default CourseDetails;