import logo from 'src/images/donation-pal-contrast-logo.svg';

import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="navbar header">
            <img className="logo navbar-brand" src={logo} alt="A hand holding a red heart with the text Donation Pal" />
            <nav>
                <ul>
                <li><Link to='/'>Login</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/home'>Home</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;