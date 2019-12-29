import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './utilities/serviceWorker';

// Container creation
const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<App />, container);
