import logo from 'src/images/donation-pal-contrast-logo.svg';

import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            <nav className="navbar navbar-expand">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <img className="logo" src={logo} alt="A hand holding a red heart with the text Donation Pal" />
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link link-opacity-100-hover" to='/'>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/profile'>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/home'>Home</Link>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default Header;