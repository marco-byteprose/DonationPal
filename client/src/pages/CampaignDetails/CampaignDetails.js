import 'src/pages/CampaignDetails/CampaignDetails.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useDataFetcher from 'src/hooks/useDataFetcher';

function CampaignDetails( {apiURL} ) {
    const { id } = useParams();

    console.log(`Campaign ID: ${id}`);
    console.log(typeof id);
    console.log('URL: ' + apiURL + '/campaigns/' + id);

    const [campaign, setCampaign] = useState({ donations: [] });
    const [data, loading, error] = useDataFetcher(apiURL + '/campaigns/' + id);

    // useEffect(() => { 
    //     console.log('Data: ' + data);
    //     setCampaign(data);
    //     console.log('Campaign: ' + campaign); 
    // }, [data]);

    useEffect(() => {
        if (data && data.length > 0) {
            setCampaign(data[0]);
        }
    }, [data]);
    
    if (loading) {
    return <p>Loading...</p>;
    }
    
    if (error) {
    return <p>Error: {error}</p>;
    }


    return (
        <div>
          <div className="campaign-details">
            <h2>{campaign.name}</h2>
            <p>{campaign.description}</p>
            <p><b>Goal:</b> ${campaign.goal}</p>
            <p><b>Start Date:</b> {new Date(campaign.start_date).toLocaleDateString()}</p>
            <p><b>End Date:</b> {new Date(campaign.end_date).toLocaleDateString()}</p>
          </div>
          <div className="campaign-donations">
          <h3>Donations</h3>
            <table id="donations">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {campaign.donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{new Date(donation.date).toLocaleDateString()}</td>
                    <td>${donation.amount}</td>
                    <td>{donation.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
}

export default CampaignDetails;