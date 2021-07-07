import React from "react";
import {BrowserRouter} from "react-router-dom"

// import components
import Header from "./Header";
import Courses from "./Courses";

// main container component
function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Courses />
    </BrowserRouter>
  );
}

export default App;
