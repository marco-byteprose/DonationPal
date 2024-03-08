import 'src/components/Campaign/Campaign.css';
import { Link } from 'react-router-dom';

function Campaign( {campaignName, description, goal, campaignId} ) {

    return (
        <div className="card border-dark">
            <h2 className="card-header">{campaignName}</h2>
            <div className="card-body">
                <p className="card-text">{description}</p>
                <h3 className="card-text">Goal: ${goal}</h3>
                <Link to={`/campaign/${campaignId}`} className="btn btn-primary">Learn More</Link>
            </div>
        </div>
    )
}

export default Campaign;
