import {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import AuthContext from './store/auth-context';
import ActionContext from './store/action-context';
import RegistrationForm from "./components/AuthComponents/RegistrationForm/RegistrationForm";
import LoginForm from "./components/AuthComponents/LoginForm/LoginForm";
import ViewUserForm from './components/UserComponents/ViewUserForm/ViewUserForm';
import AccountRegistration from './components/AccountComponents/RegisterAccount/AccountRegistry';
import ViewAccount from './components/AccountComponents/ViewAccounts/ViewAccountList';
import AccountSingle from './components/AccountComponents/ViewAccounts/ViewSingleAccount';
import AccountDeactivator from './components/AccountComponents/AccountDeactivation/AccountDeactivator'
import Layout from './components/LayoutComponents/PageLayout/Layout';
import CardSignUp from './components/CardComponents/CardSignUp/CardSignUp'
import UserCards from './components/CardComponents/UserCards/UserCards';
import CardStatus from "./components/CardComponents/CardStatus/CardStatus";
import CardTypes from "./components/CardComponents/CardTypes/CardTypes";
import HomePage from "./components/Pages/HomePage/HomePage";

function App() {
    const authContext = useContext(AuthContext);
    const actionContext = useContext(ActionContext);
    return (
        <div className="App">
            <Switch>
                <Route path={'/'} exact={true}>
                    <HomePage />
                </Route>
                <Route path={'/users'}>
                    <Layout>
                    {!authContext.userIsLoggedIn && <RegistrationForm url={'http://localhost:9001/users'}/>}
                    </Layout>
                </Route>
                <Route path={'/me'}>
                    <Layout>
                        {authContext.userIsLoggedIn && <ViewUserForm/>}
                    </Layout>
                </Route>
                <Route path={'/accounts/deactivate'}>
                    <Layout>
                        {authContext.userIsLoggedIn && <AccountDeactivator/>}
                    </Layout>
                </Route>
                <Route path={'/accounts/single/:id'}>
                    <Layout>
                    {authContext.userIsLoggedIn && <AccountSingle/>}
                    </Layout>
                </Route>
                <Route path={'/accounts/me'}>
                    <Layout>
                    {authContext.userIsLoggedIn && <ViewAccount/>}
                    </Layout>
                </Route>
                <Route path={'/accounts'}>
                    <Layout>
                    {authContext.userIsLoggedIn && <AccountRegistration/>}
                    </Layout>
                </Route>
                <Route path={'/auth'}>
                    <Layout>
                        {!authContext.userIsLoggedIn && <LoginForm/>}
                        {authContext.userIsLoggedIn && <Redirect to={'/'}/>}
                    </Layout>
                </Route>
                <Route path={'/cardoffers'}>
                    <Layout>
                        <CardTypes />
                    </Layout>
                </Route>
                <Route path={'/cardsignup'}>
                    <Layout>
                        <CardSignUp />
                    </Layout>
                </Route>
                <Route path={'/cards/:cardId'}>
                    <Layout>
                        <CardStatus/>
                    </Layout>
                </Route>
                <Route path={'/cards'}>
                    <Layout>
                        <UserCards/>
                    </Layout>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
