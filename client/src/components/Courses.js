import React, {useState, useEffect} from "react";
import axios from "axios";

const Courses = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/courses")
            .then(res => setCourses(res.data))
    }, []);

    let component = courses.map((course, index) => (
        <a key={index} className="course--module course--link" href="course-detail.html">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </a>
    ))

    return (
        <div className="wrap main--grid">
            {component}
        </div>
    );
}
export default Courses;