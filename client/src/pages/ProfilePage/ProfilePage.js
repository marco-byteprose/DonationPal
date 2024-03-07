import { Navigate } from 'react-router-dom';
import useToken from 'src/hooks/useToken';

export default function ProfilePage() {
    const {token, setToken} = useToken();

    // If no token set, user is not authorized to see this page
    if (!token) {
        // Redirect user to the root route
        return <Navigate replace to='/' />
    }

    return (
        <div>
            <h1>My Profile</h1>
            { token }
        </div>
    )
}