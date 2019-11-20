import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import configureStore from './state/store/configureStore'
import { verifyCredentials } from './state/actions/reduxTokenAuthConfig'
import axios from 'axios'


const store = configureStore()

verifyCredentials(store)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Provider>, 
document.getElementById('root'))
serviceWorker.unregister()