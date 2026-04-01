import { Link } from "react-router-dom";

function CoinRow({ coin, favorites, toggleFavorite }) {
    return (
        <tr>
            <td>
                <Link to={`/coin/${coin.CoinInfo.Name}`}>
                    {coin.CoinInfo.FullName}
                </Link>
            </td>
            <td>{coin.DISPLAY.USD.PRICE}</td>
            <td
                style={{
                    color: coin.RAW.USD.CHANGEPCT24HOUR >= 0 ? "#5bcf9b" : "#e573a9",
                }}
            >
                {coin.DISPLAY.USD.CHANGEPCT24HOUR}%
            </td>
            <td>
                <button
                    className="favorite-button"
                    onClick={() => toggleFavorite(coin.CoinInfo.Name)}
                >
                    {favorites.includes(coin.CoinInfo.Name) ? "★" : "☆"}
                </button>
            </td>
        </tr>
    );
}

export default CoinRow;