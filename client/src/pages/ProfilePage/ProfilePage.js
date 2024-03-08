import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { APIURLContext } from 'src/contexts/APIURLContext';
import useToken from 'src/hooks/useToken';
import axios from 'axios';
import useDataFetcher from 'src/hooks/useDataFetcher';

function ProfilePage() {

    const {token, setToken} = useToken();
    const apiURL = useContext(APIURLContext);

    const [userProfile, setUserProfile] = useState();
    const [data,loading, error] = useDataFetcher(apiURL + '/users/me');

    useEffect(() => {
        console.log("Data: " + data);
        setUserProfile(data);
        console.log("UserProfile: " + userProfile);
    }, [data]);

    // if (!token) {
    //     return <Navigate replace to='/' />
    // }

    return (
        <div>
            <h1>Welcome</h1>
            { token }
            <br />
            { apiURL }
            
        </div>
    )
}

export default ProfilePage;