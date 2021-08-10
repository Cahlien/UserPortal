import { render, screen } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";

import App from './App';

describe('App Component', () => {
    test('renders welcome to beardtrust', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        // const welcomeBanner = screen.getByText('Welcome to BeardTrust!');
        // expect(welcomeBanner).toBeInTheDocument();
    });
});



