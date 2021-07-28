import {useContext} from 'react';
import {Link} from 'react-router-dom';

import AuthContext from '../../store/auth-context';

function MainNavigation(props) {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isLoggedIn;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="">Beardtrust</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        {!authContext.userIsLoggedIn && <Link className={'nav-link'} to={'/users'}>Register</Link>}
                        {authContext.userIsLoggedIn && <Link className={'nav-link'} to={'/'}>Profile</Link>}
                    </li>
                    <li className="nav-item">
                       {!authContext.userIsLoggedIn && <Link className={'nav-link'} to={'/auth'}>Log In</Link>}
                       {authContext.userIsLoggedIn && <Link className={'nav-link'} to={'/'}>Logout</Link>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainNavigation;