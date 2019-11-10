import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic-ui-min'

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
