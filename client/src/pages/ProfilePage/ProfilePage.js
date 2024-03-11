import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { APIURLContext } from 'src/contexts/APIURLContext';
import useToken from 'src/hooks/useToken';
import useDataFetcher from 'src/hooks/useDataFetcher';
import 'src/pages/ProfilePage/ProfilePage.css';

function ProfilePage() {

    const {token, setToken} = useToken();
    const apiURL = useContext(APIURLContext);
    const navigate = useNavigate();
    const [data, loading, error] = useDataFetcher(apiURL + '/users/me');

    const [userProfile, setUserProfile] = useState({ donations: [] });

    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Handler function to get donation total
        const getDonationTotal = () => {
            var newTotal = 0;
            userProfile.donations.map((donation) => {
                newTotal += donation.amount;
            });
            setTotal(newTotal);
        }

        // This conditional is required when joining collections since resulting data is an array with array[0] holding the user Object with joined data
        if (data && data.length > 0) {
            setUserProfile(data[0]);

            getDonationTotal();
        }
    }, [data, userProfile]);

    // Handler function to erase accessToken
    const handleClick = () => {
        setToken(null);
        navigate('/');
    }

    // Handler function to navigate to CampaignDetail page
    const handleRowClick = (campaignId) => {
        navigate(`/campaign/${campaignId}`);
    }


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
            <div className="logout-btn">
                <button type="submit" className="btn btn-outline-danger" onClick={handleClick}>Logout</button>
            </div>
            <div className="container-fluid">
                <h1>Welcome, { userProfile.name?.first }!</h1>
                <p><b>Email: </b>{ userProfile.email }</p>
                <p><b>Current Donation Total: </b>${ total }</p>
            </div>
            <div className="container-fluid">
                <h3>Donations Made</h3>
                <table id="donations">
                <thead>
                    <tr>
                    <th className="col-2">Date</th>
                    <th className="col-2">Amount</th>
                    <th className="col-6">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {userProfile.donations?.map((donation) => (
                    <tr key={donation?._id} onClick={() => handleRowClick(donation?.campaign_id)} style={ {cursor: "pointer"} }>
                        <td>{new Date(donation?.date).toLocaleDateString()}</td>
                        <td>${donation?.amount}</td>
                        <td>{donation?.message}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProfilePage;