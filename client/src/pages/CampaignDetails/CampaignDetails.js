import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import useDataFetcher from 'src/hooks/useDataFetcher';
import { APIURLContext } from 'src/contexts/APIURLContext';

function CampaignDetails() {
    const { id } = useParams();

    console.log(`Campaign ID: ${id}`);
    console.log(typeof id);

    const apiURL = useContext(APIURLContext);
    const [campaign, setCampaign] = useState({ donations: [] });
    const [data, loading, error] = useDataFetcher(apiURL + '/campaigns/' + id);

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
          <div className="container">
            <h1 className="card-title">{campaign?.name}</h1>
            <p className="card-text">{campaign?.description}</p>
            <p className="card-text"><b>Goal:</b> ${campaign?.goal}</p>
            <p className="card-text"><b>Start Date:</b> {new Date(campaign?.start_date).toLocaleDateString()}</p>
            <p className="card-text"><b>End Date:</b> {new Date(campaign?.end_date).toLocaleDateString()}</p>
          </div>
          <div className="container-fluid">
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
                {campaign.donations?.map((donation) => (
                  <tr key={donation?._id}>
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

export default CampaignDetails;