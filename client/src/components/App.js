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

// main container component
function App() {
  
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/">
          <Courses />
        </Route>

        <Route exact path="/courses/:id">
          <CourseDetail />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
