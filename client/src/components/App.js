import React from "react";
import {BrowserRouter} from "react-router-dom"

// import components
import Header from "./Header"

// main container component
function App() {
  
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;
