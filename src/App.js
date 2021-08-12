import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from './store/auth-context';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import ViewUserForm from './components/ViewUserForm/ViewUserForm';
import AccountRegistration from './components/AccountComponents/RegisterAccount/AccountRegistry';
import ViewAccount from './components/AccountComponents/ViewAccounts/AccountListLogic';
import AccountSingle from './components/AccountComponents/ViewAccounts/SingleAccountLogic';
import AccountDeactivator from './components/AccountComponents/AccountDeactivation/AccountDeactivator'
import Layout from './components/layout/Layout';
import CardSignUp from './components/CardComponents/CardSignUp/CardSignUp'
import CardTypes from './components/CardTypes/CardTypes'

function App() {
    const authContext = useContext(AuthContext);
    return (
        <div className="App">
            <Switch>
                <Route path={'/'} exact={true}>
                    <Layout>
                        <p>Welcome to BeardTrust</p>
                        <CardTypes />
                    </Layout>
                </Route>
                <Route path={'/users'}>
                    <Layout >
                    {!authContext.userIsLoggedIn && <RegistrationForm url={'http://localhost:9001/users'} />}
                    </Layout >
                </Route>
                <Route path={'/me'}>
                    <Layout>
                    {authContext.userIsLoggedIn && <ViewUserForm />}
                    </Layout>
                </Route>
                <Route path={'/accounts/deactivate'}>
                    <Layout>
                    {authContext.userIsLoggedIn && <AccountDeactivator />}
                    </Layout>
                </Route>
                <Route path={'/accounts/single/:id'}>
                    <Layout>
                    {authContext.userIsLoggedIn && <AccountSingle />}
                    </Layout>
                </Route>
                <Route path={'/accounts/me'}>
                    <Layout>
                    {authContext.userIsLoggedIn && <ViewAccount />}
                    </Layout>
                </Route>
                <Route path={'/accounts'}>
                    <Layout>
                    {authContext.userIsLoggedIn && <AccountRegistration />}
                    </Layout>
                </Route>
                <Layout>
                    <Route path={'/auth'}>
                        {!authContext.userIsLoggedIn && <LoginForm />}
                        {authContext.userIsLoggedIn && <Redirect to={'/'} />}
                    </Route>
                </Layout>
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
