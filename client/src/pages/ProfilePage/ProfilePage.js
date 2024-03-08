import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { APIURLContext } from 'src/contexts/APIURLContext';
import useToken from 'src/hooks/useToken';
import useDataFetcher from 'src/hooks/useDataFetcher';

function ProfilePage() {

    const {token, setToken} = useToken();
    const apiURL = useContext(APIURLContext);
    const [data, loading, error] = useDataFetcher(apiURL + '/users/me');

    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        if (data) {
            console.log("Data: ");
            setUserProfile(data);
            console.log("userProfile: ");
            console.log(userProfile);
        }
    }, [data, userProfile]);

    if (!token) {
        return <Navigate replace to='/' />
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: { error }</p>
    }
    // Had issue where properties below were being accessed, like userProfile.name.first , before data was loaded into userProfile
    // Using optional chaining below, ? , we incorporate defensive programming; this allows the component to render
    // even when data is not in correct shape, undefined, or no data at all
    // https://www.digitalocean.com/community/tutorials/how-to-handle-async-data-loading-lazy-loading-and-code-splitting-with-react
    return (
        <div>
            <h1>Welcome { userProfile.name?.first }!</h1>
            <br />
            <p><b>Email: </b>{ userProfile.email }</p>
            <br />
            <p><b>Current Donation Total: </b>{ userProfile.dob?.age }</p>
            <br />
            <p>My gender is: { userProfile?.gender }</p>
            <br />
            <p>My Name is: { userProfile.name?.last }</p>


            
        </div>
    )
}

export default ProfilePage;