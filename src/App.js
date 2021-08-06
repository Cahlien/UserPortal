import {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import AuthContext from './store/auth-context';

import Layout from './components/layout/Layout';
import MainNavigation from './components/layout/MainNavigation';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import MainFooter from "./components/layout/MainFooter";
import CardTypes from "./components/CardTypes/CardTypes";
import CardSignUp from './components/CardSignUp/CardSignUp';
import ActionContext from "./store/action-context";

function App() {
    const authContext = useContext(AuthContext);
    const actionContext = useContext(ActionContext);
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
                    <Layout>
                        <RegistrationForm url={'http://localhost:9001/users'}/>
                    </Layout>
                </Route>
                <Route path={'/auth'}>
                    <Layout>
                        {!authContext.userIsLoggedIn && <LoginForm/>}
                        {authContext.userIsLoggedIn && <Redirect to={'/'}/>}
                    </Layout>
                </Route>
                <Route path={'/cardsignup'}>
                    <CardSignUp />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
