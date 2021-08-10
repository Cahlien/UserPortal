import { render, screen } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";

import App from './App';

describe('App Component', () => {
    test('creates homepage', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
<<<<<<< HEAD
        // const welcomeBanner = screen.getByText('Welcome to BeardTrust!');
        // expect(welcomeBanner).toBeInTheDocument();
=======
        const homePage = screen.getAllByText('BeardTrust', {exact: false});
        expect(homePage).toBeTruthy();
>>>>>>> origin/dev
    });
});



