import 'src/pages/Home/Home.css';

import { useState, useEffect } from 'react';
import Campaign from 'src/components/Campaign/Campaign';
import useDataFetcher from 'src/hooks/useDataFetcher';

function Home( {apiURL} ) {
    const [campaigns, setCampaigns] = useState([]);
    const [data, loading, error] = useDataFetcher(apiURL + '/campaigns');

    useEffect(() => { setCampaigns(data) }, [data]);

    return (
        <div className="cards">
            {campaigns.map( (campaign) => (
                <Campaign 
                key={campaign.id}
                id={campaign.id}
                campaignId={campaign._id} 
                campaignName={campaign.name} 
                description={campaign.description} 
                goal={campaign.goal}
                />
            ))}
        </div>
    )
}

export default Home;