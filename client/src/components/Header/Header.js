import 'src/components/Header/Header.css';
import logo from 'src/images/1.png';

import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="Header-wrapper">
            <div className="img-container">
                <img src={logo} alt="Logo of two hands holding a red heart" />
            </div>
            <div className="menu-container">
                <nav>
                    <ul>
                        <Link to="/"><li>Home</li></Link>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header;