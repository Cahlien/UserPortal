import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import {BrowserRouter} from "react-router-dom";
import { AuthContextProvider } from './store/auth-context';


ReactDOM.render(
    <AuthContextProvider>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </AuthContextProvider>,
    document.getElementById('root')
);
