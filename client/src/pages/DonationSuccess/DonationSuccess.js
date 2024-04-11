import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { APIURLContext } from "src/contexts/APIURLContext";
import useGetOneCampaign from "src/hooks/useGetOneCampaign";
import 'src/pages/DonationSuccess/DonationSuccess.css';

function DonationSuccess() {
    const [campaign, setCampaign] = useState({});

    const apiURL = useContext(APIURLContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const campaignID = searchParams.get('campaign_id');
    const donationAmount = searchParams.get('donation_amount');

    const [loading, error, campaignData] = useGetOneCampaign(apiURL + '/campaigns/' + campaignID);

    useEffect(() => {
        setCampaign(campaignData[0]);
    }, [campaignData]);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center success">
            {campaign && (
            <div className="container text-center">
                <p className="display-4">Donation success! You donated ${donationAmount} to the campaign</p>
                <p className="display-3">{campaign.name}</p>
            </div>
            )}
        </div>
    )
}

export default DonationSuccess;