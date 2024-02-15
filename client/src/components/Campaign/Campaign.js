import 'src/components/Campaign/Campaign.css';
import { Link } from 'react-router-dom';

function Campaign( {campaignName, description, goal, campaignId} ) {

    return (
        <div className="card">
            <div className="top-card">
                <h2>{campaignName}</h2>
                <p>{description}</p>
            </div>
            <div className="bottom-card">
                <h3>Goal: ${goal}</h3>
                <Link to={`/campaign/${campaignId}`} className='card-button'>Learn More</Link>
            </div>
        </div>
    )
}

export default Campaign;
