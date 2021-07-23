import {Route, Switch} from 'react-router-dom';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path={'/'} exact={true}>
                <h1>Welcome to BeardTrust!</h1>
                <a href={'/users'}>Register</a>
            </Route>
            <Route path={'/users'}>
                <RegistrationForm url={'http://localhost:9001/users'}/>
            </Route>
            <Route path={'/login'}>
                <LoginForm />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
