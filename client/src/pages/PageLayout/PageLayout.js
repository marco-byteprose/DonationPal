import { Link, Outlet } from 'react-router-dom';

export default function PageLayout() {
    return (
        <div>
            <nav>
                <li><Link to='/'>Login</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/home'>Home</Link></li>
            </nav>

            <Outlet />
            <br />
            <br />

            <div>Footer</div>
        </div>
    )
}