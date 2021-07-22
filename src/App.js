import {Route, Switch} from 'react-router-dom';
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path={'/'} exact={true}>
                <h1>Welcome to BeardTrust!</h1>
                <a href={'/users'}>Register</a>
            </Route>
            <Route path={'/users'}>
                <RegistrationForm />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
