
// import modules
import React from "react";
import {Link} from "react-router-dom";

// renders when url matches no set routes
const NotFound = () => {
    return (
        <main>
            <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
                <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
        </main>
    );
}
export default NotFound;