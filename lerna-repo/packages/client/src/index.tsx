import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Root } from './views/Root';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.render(
    <React.StrictMode>
        {/* <userDataProvider> */}
        <Root />
        {/* </userDataProvider> */}
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
