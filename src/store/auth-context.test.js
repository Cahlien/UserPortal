import {act, cleanup, render, screen} from '@testing-library/react';
import AuthContext, {AuthContextProvider} from "./auth-context";
import React from 'react';

describe("Auth context", () => {
   it("creates an auth context", () => {
      const authContext = React.createContext(AuthContext);
      expect(authContext).not.toBe(null);
   });
});