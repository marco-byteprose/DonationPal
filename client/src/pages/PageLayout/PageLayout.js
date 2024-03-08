import { Link, Outlet } from 'react-router-dom';
import 'src/pages/PageLayout/PageLayout.css';
import Header from 'src/components/Header/Header';

export default function PageLayout() {
    return (
        <div>
            <Header />
            <Outlet />

        </div>
    
    )
}