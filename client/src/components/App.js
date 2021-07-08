import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom"

// import components
import Header from "./Header";
import Courses from "./Courses";
import CourseDetail from "./CourseDetail";
import UserSignUp from "./UserSignUp";
import UserSignIn from "./UserSignIn";
import UserSignOut from "./UserSignOut";

// import context
// import {withContext} from "../Context";

// wrap components with context
// const UserSignUpWithContext = withContext(UserSignUp);
// const UserSignInWithContext = withContext(UserSignIn);

// main container component
function App() {
  
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/">
          <Courses />
        </Route>

        <Route path="/courses/:id">
          <CourseDetail />
        </Route>

        <Route path="/signup">
          <UserSignUp />
        </Route>

        <Route path="/signin">
          <UserSignIn />
        </Route>

        <Route path="/signout">
          <UserSignOut />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
