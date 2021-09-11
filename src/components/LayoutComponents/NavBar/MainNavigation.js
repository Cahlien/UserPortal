import {useContext, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Dropdown} from "react-bootstrap";
import AuthContext from '../../../store/auth-context';
import "../PageLayout/Layout.css"

/**
 * This function returns the html element for the main navigation bar/header
 * for the application.
 *
 * @param props
 * @returns {JSX.Element} the html element containing the navbar/header
 * @constructor
 */
function MainNavigation(props) {
    const authContext = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        authContext.logout();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light main-navbar mx-2">
            <a className="navbar-brand" href="/">BeardTrust</a>
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
                       {authContext.userIsLoggedIn && <Link className={'nav-link'} to={'/me'}>My Details</Link>}
                    </li>
                    {authContext.userIsLoggedIn &&
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className={'undecorated'} id="accounts-dropdown">
                            Accounts
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link className={'nav-link dropdown-item'} to="/accounts">Apply for Account</Link>
                            <Link className={'nav-link dropdown-item'} to="/accounts/me">My Accounts</Link>
                        </Dropdown.Menu>
                    </Dropdown>}
                    {authContext.userIsLoggedIn &&
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className={'undecorated'} id="cards-dropdown">
                            Cards
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link className={'nav-link dropdown-item'} to="/cardoffers">Apply for Card</Link>
                            <Link className={'nav-link dropdown-item'} to="/cards">My Cards</Link>
                        </Dropdown.Menu>
                    </Dropdown>}
                    {authContext.userIsLoggedIn &&
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className={'undecorated'} id="loans-dropdown">
                            Loans
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link className={'nav-link dropdown-item'} to="/loanoffers">Apply for Loan</Link>
                            <Link className={'nav-link dropdown-item'} to="/myloans">My Loans</Link>
                        </Dropdown.Menu>
                    </Dropdown>}
                    <li className="nav-item">
                        {!authContext.userIsLoggedIn && <Link className={'nav-link'} to={'/auth'}>Log In</Link>}
                        {authContext.userIsLoggedIn && <Link className={'nav-link'} onClick={logout} to={'/'}>Logout</Link>}
                    </li>
                </ul>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                    crossOrigin="anonymous"/>
        </nav>
    )
}

export default MainNavigation;
