import 'src/pages/Home/Home.css';
import { useState, useEffect, useContext } from 'react';
import Campaign from 'src/components/Campaign/Campaign';
import useDataFetcher from 'src/hooks/useDataFetcher';
import { APIURLContext } from 'src/contexts/APIURLContext';

function Home() {
    const apiURL = useContext(APIURLContext);
    const [campaigns, setCampaigns] = useState([]);
    const [data, loading, error] = useDataFetcher(apiURL + '/campaigns');

    useEffect(() => { 
        if (data) {
            setCampaigns(data); 
        }
    }, [data, campaigns]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    // Change object to array to use .map function below
    const campaignsArray = Object.values(campaigns);

    return (
        <div className="cards">
            {campaignsArray?.map( (campaign) => (
                <Campaign 
                key={campaign?.id}
                id={campaign?.id}
                campaignId={campaign?._id} 
                campaignName={campaign?.name} 
                description={campaign?.description} 
                goal={campaign?.goal}
                />
            ))}
        </div>
    )
}

export default Home;