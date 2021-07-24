import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    userId: '',
    login: (token) => {
    }
});

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

    const contextValue = {
        token: token,
        userIsLoggedIn: userIsLoggedIn,
        userId: userId,
        login: loginHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;