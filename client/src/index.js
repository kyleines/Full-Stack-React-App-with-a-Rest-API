/*************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack React App with a Rest API
*************************************************/

/*
Dear Reviewer,
I appreciate you for taking the time to review my final project! 
Your feedback is important to me and crucial to my growth as a developer.
With the following code I hope to earn the last "Exceeds Expectations" grade of this 
techdegree, and I humbly request that you reject my submission if I don't meet those requirements.

Thank you again!
-Kyle
a soon-to-be Team Treehouse Graduate!
*/


// import modules
import React from 'react';
import ReactDOM from 'react-dom';

// import styles
import './styles/reset.css'
import './styles/global.css';

// import context provider
import {Provider} from "./Context";

// import main container component
import App from './components/App';

// render awesomeness :)
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);