import './polyfills.js';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Routes } from '@core';

import './styles/flyticket.scss';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Routes />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals(console.log);
