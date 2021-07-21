import {Route, Switch} from 'react-router-dom';
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path={'/'} exact={true}>
                <RegistrationForm />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
