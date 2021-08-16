import HomePage from "./HomePage";
import {render, screen} from "@testing-library/react";
import {MemoryRouter as Router} from "react-router";
import userEvent from '@testing-library/user-event';

describe('HomePage', () => {
    it('should render the home page element', () => {
       const component = render(
           <Router>
               <HomePage/>
           </Router>);
       expect(component).toBeTruthy();
    });
});