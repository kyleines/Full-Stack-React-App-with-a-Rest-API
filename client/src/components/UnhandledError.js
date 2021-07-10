
// import modules
import React from "react";
import {Link} from "react-router-dom";

// renders for returned status code 500
const UnhandledError = () => {
    return (
        <main>
            <div className="wrap">
                <h2>Error</h2>
                <p>Sorry! We just encountered an unexpected error.</p>
                <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
        </main>
    );
}
export default UnhandledError;