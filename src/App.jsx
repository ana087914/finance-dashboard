import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CoinRow from "./components/CoinRow";
import { fetchCoins } from "./services/api";

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

                <SearchBar search={search} setSearch={setSearch} />

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
                                <CoinRow
                                    key={coin.CoinInfo.Name}
                                    coin={coin}
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                />
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