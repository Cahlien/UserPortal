import {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import AuthContext from './store/auth-context';

import MainNavigation from './components/layout/MainNavigation';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
    const authContext = useContext(AuthContext);

    return (
        <div className="App">
            <Switch>
                <Route path={'/'} exact={true}>
                    <MainNavigation/>
                </Route>
                <Route path={'/users'}>
                    <MainNavigation/>
                    <RegistrationForm url={'http://localhost:9001/users'}/>
                </Route>
                <Route path={'/auth'}>
                    {!authContext.userIsLoggedIn && <LoginForm/>}
                    {authContext.userIsLoggedIn && <Redirect to={'/'}/>}
                </Route>
            </Switch>
        </div>
    );
}

export default App;
