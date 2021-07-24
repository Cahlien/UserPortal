import {useContext} from 'react';
import {Link} from 'react-router-dom';

import AuthContext from '../../store/auth-context';

function MainNavigation(props) {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isLoggedIn;

    return (
        <header>
            <Link to={'/'}>
                <div>BeardTrust</div>
            </Link>
            <nav>
                <ul>
                    <li>
                        {!authContext.userIsLoggedIn && <Link to={'/auth'}>Login</Link>}
                        {authContext.userIsLoggedIn && <Link to={'/'}>Logout</Link>}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;