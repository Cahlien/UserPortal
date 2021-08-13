import {render, screen, cleanup, act} from '@testing-library/react';
import AuthContext, {AuthContextProvider} from "../../../store/auth-context";
import MainNavigation from "./MainNavigation";
import {createContext, useContext} from "react";
import {BrowserRouter} from "react-router-dom";

describe('MainNavigation', () => {
   beforeEach(() => {

   });

   afterEach(cleanup);

   it('should render', () =>{
       const mainNav = render(<BrowserRouter><MainNavigation /></BrowserRouter>);
       expect(mainNav).not.toBeNull();
   });
});