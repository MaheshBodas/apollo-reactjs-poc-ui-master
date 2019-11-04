import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import './themes/redmond/jquery-ui.min.css'
// import './themes/html5up/assets/css/main.css'
// import './_components/RotatingDisplay/RotatingDisplay.css'
import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
// import App  from './App' 
import * as serviceWorker from './serviceWorker';
import 'element-theme-default/lib/index.css'
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

import App from './App'
// import client from './api/apolloclient'
// import ConnectedApp from './ConnectedApp'

//Strip console.log
if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
}

i18n.use(locale);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
