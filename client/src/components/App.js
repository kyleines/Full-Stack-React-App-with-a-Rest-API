
// import modules
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

// import components
import Header from "./Header";
import Courses from "./Courses";
import CourseDetails from "./CourseDetails";
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import UserSignUp from "./UserSignUp";
import UserSignIn from "./UserSignIn";
import UserSignOut from "./UserSignOut";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";
import UnhandledError from "./UnhandledError";

// main container component
function App() {
  
  return (
    <BrowserRouter>

      <Header />

      <Switch>

        {/*  list of courses  */}
        <Route exact path="/" component={Courses} />

        {/*  just in case  */}
        <Redirect exact from="/courses" to="/" />

        {/*  form for creating a course (requires authentication)  */}
        <PrivateRoute path="/courses/create" component={CreateCourse} />

        {/*  details for an individual course  */}
        <Route exact path="/courses/:id" component={CourseDetails} />

        {/*  update a course (requires authorization)  */}
        <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />

        {/*  delete a course (requires authorization)  */}
        <PrivateRoute path="/courses/:id/delete" component={DeleteCourse} />

        {/*  form for new user sign up  */}
        <Route path="/signup" component={UserSignUp} />

        {/*  form for authenticating existing user  */}
        <Route path="/signin" component={UserSignIn} />

        {/*  removes authenticated user and cookie  */}
        <Route path="/signout" component={UserSignOut} />

        {/*  requested page can't be found  */}
        <Route path="/notfound" component={NotFound} />

        {/*  user doesn't have access to the requested page  */}
        <Route path="/forbidden" component={Forbidden} />

        {/*  an unexpected error has occurred  */}
        <Route path="/error" component={UnhandledError} />

        {/*  catches any unmatched routes  */}
        <Route component={NotFound} />

      </Switch>

    </BrowserRouter>
  );
}
export default App;
