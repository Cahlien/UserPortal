import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from './store/auth-context';
<<<<<<< HEAD
import MainFooter from './components/layout/MainFooter';
import MainNavigation from './components/layout/MainNavigation';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import ViewUserForm from './components/ViewUserForm/ViewUserForm';
import AccountRegistration from './components/AccountComponents/RegisterAccount/AccountRegistry';
import ViewAccount from './components/AccountComponents/ViewAccounts/ViewAccountList';
import AccountSingle from './components/AccountComponents/ViewAccounts/ViewSingleAccount';
import AccountDeactivator from './components/AccountComponents/AccountDeactivation/AccountDeactivator'
import Layout from './components/layout/Layout';
import CardSignUp from './components/CardComponents/CardSignUp/CardSignUp'
=======

import Layout from './components/layout/Layout';
import MainNavigation from './components/layout/MainNavigation';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import MainFooter from "./components/layout/MainFooter";
import CardTypes from "./components/CardTypes/CardTypes";
import CardSignUp from './components/CardSignUp/CardSignUp';
import ActionContext from "./store/action-context";
>>>>>>> origin/dev

function App() {
    const authContext = useContext(AuthContext);
    const actionContext = useContext(ActionContext);
    return (
        <div className="App">
            <Switch>
                <Route path={'/'} exact={true}>
<<<<<<< HEAD
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
                <Route path={'/accounts/deactivate'}>
                    <MainNavigation />
                    {authContext.userIsLoggedIn && <AccountDeactivator />}
                    <MainFooter />
                </Route>
                <Route path={'/accounts/single/:id'}>
                    <MainNavigation />
                    {authContext.userIsLoggedIn && <AccountSingle />}
                    <MainFooter />
                </Route>
                <Route path={'/accounts/me'}>
                    <MainNavigation />
                    {authContext.userIsLoggedIn && <ViewAccount />}
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
=======
                    <Layout>
                        <p>Welcome to BeardTrust</p>
                        <CardTypes />
                    </Layout>
                </Route>
                <Route path={'/users'}>
                    <Layout>
                        <RegistrationForm url={'http://localhost:9001/users'}/>
                    </Layout>
                </Route>
                <Route path={'/auth'}>
                    <Layout>
                        {!authContext.userIsLoggedIn && <LoginForm/>}
                        {authContext.userIsLoggedIn && <Redirect to={'/'}/>}
                    </Layout>
>>>>>>> origin/dev
                </Route>
                <Route path={'/cardsignup'}>
                    <Layout>
                        <CardSignUp />
                    </Layout>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
