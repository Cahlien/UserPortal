import {act, cleanup, render, screen} from '@testing-library/react';
import AuthContext, {AuthContextProvider} from "./auth-context";
import React from 'react';


describe("Auth context", () => {
   let authContext;

   beforeEach(() => {
      authContext = React.createContext(AuthContext);
   })

   it("should create an auth context", () => {
      expect(authContext).toBeTruthy();
   });
});