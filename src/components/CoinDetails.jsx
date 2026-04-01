import { useParams } from "react-router-dom";

function CoinDetails() {
    const { id } = useParams();

    return (
        <div className="dashboard-container">
            <h1>Coin details</h1>

            <p>Selected coin: {id}</p>
        </div>
    );
}

export default CoinDetails;