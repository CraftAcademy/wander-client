import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
import "semantic-ui-css/semantic.min.css"

=======
import 'semantic-ui-css/semantic.min.css'
>>>>>>> a355ba8e7b037ac12ad290f9d804a26d29125245

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
document.getElementById('root'));
serviceWorker.unregister();
