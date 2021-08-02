import React, {useState} from 'react';

/**
 * This method returns an auth context.
 *
 * @type {React.Context<{isLoggedIn: boolean, login: login, userId: string, token: string}>}
 */
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    userId: '',
    login: (token) => {
    },
    logout: () => {}
});

/**
 * This method implements the auth context.
 *
 * @param props the properties passed into the auth context
 * @returns {JSX.Element} the component in jsx form
 * @constructor
 */
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const initialUserId = localStorage.getItem('userId');

    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialUserId);

    const userIsLoggedIn = !!token;

    const loginHandler = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        setToken(token);
        setUserId(userId);
    };

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        setToken(null);
        setUserId(null);
    };

    const contextValue = {
        token: token,
        userIsLoggedIn: userIsLoggedIn,
        userId: userId,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;