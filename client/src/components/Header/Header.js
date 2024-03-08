import logo from 'src/images/donation-pal-contrast-logo.svg';

import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="container-fluid header">
            <div className="row">
                <div className="col-4">
                    <img className="logo" src={logo} alt="A hand holding a red heart with the text Donation Pal" />
                </div>
                <div className="col-8 align-self-center">
                    <nav>
                        <ul>
                        <li><Link to='/'>Login</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                            <li><Link to='/home'>Home</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header;