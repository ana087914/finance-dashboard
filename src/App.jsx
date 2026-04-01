import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { fetchCoins } from "./services/api";
import { Link } from "react-router-dom";

function App() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        async function loadData() {
            const data = await fetchCoins();
            setCoins(data);
        }

        loadData();
    }, []);

    function toggleFavorite(symbol) {
        if (favorites.includes(symbol)) {
            setFavorites(favorites.filter((item) => item !== symbol));
        } else {
            setFavorites([...favorites, symbol]);
        }
    }

    const filteredCoins = coins.filter((coin) =>
        coin.CoinInfo.FullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="app">
            <Navbar />

            <div className="dashboard-container">
                <h1 className="title">Finance Dashboard</h1>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search coin..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="table-card">
                    {coins.length === 0 ? (
                        <p className="loading-text">Loading...</p>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>24h Change</th>
                                <th>Favorite</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredCoins.map((coin) => (
                                <tr key={coin.CoinInfo.Name}>
                                    <td>
                                        <Link to={`/coin/${coin.CoinInfo.Name}`}>
                                            {coin.CoinInfo.FullName}
                                        </Link>
                                    </td>
                                    <td>{coin.DISPLAY.USD.PRICE}</td>
                                    <td
                                        style={{
                                            color:
                                                coin.RAW.USD.CHANGEPCT24HOUR >= 0
                                                    ? "#5bcf9b"
                                                    : "#e573a9",
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
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;