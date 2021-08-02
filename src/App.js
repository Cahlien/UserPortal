import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from './store/auth-context';
import MainFooter from './components/layout/MainFooter';
import MainNavigation from './components/layout/MainNavigation';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import ViewUserForm from './components/ViewUserForm/ViewUserForm';
import AccountRegistration from './components/RegisterAccount/AccountRegistry';

function App() {
    const authContext = useContext(AuthContext);

    return (
        <div className="App">
            <Switch>
                <Route path={'/'} exact={true}>
                    <MainNavigation />
                </Route>
                <Route path={'/users'}>
                    <MainNavigation />
                    {!authContext.userIsLoggedIn && <RegistrationForm url={'http://localhost:9001/users'} />}
                    <MainFooter />
                </Route>
                <Route path={'/me'}>
                    <MainNavigation />
                    {authContext.userIsLoggedIn && <ViewUserForm />}
                    <MainFooter />
                </Route>
                <Route path={'/accounts'}>
                    <MainNavigation />
                    {authContext.userIsLoggedIn && <AccountRegistration />}
                    <MainFooter />
                </Route>
                <Route path={'/auth'}>
                    {!authContext.userIsLoggedIn && <LoginForm />}
                    {authContext.userIsLoggedIn && <Redirect to={'/'} />}
                    <MainFooter />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
