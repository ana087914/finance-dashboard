import { useEffect, useState } from "react";//Folosesc asta pentru a salva date care se pot schimba.
import Navbar from "./components/Navbar"; //Folosesc asta pentru a face ceva când pagina pornește.
import SearchBar from "./components/SearchBar";//când deschizi pagina:se execută codul  ia date de la API pune datele înc
import CoinRow from "./components/CoinRow";
import CoinChart from "./components/CoinChart";
import { fetchCoins } from "./services/api";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadData(){
      const data = await fetchCoins();
      setCoins(data);
    }
//1 keer uitvoert.open*/}
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

        {/* Asta înseamnă că trimiți primele 10 coins la chart */}  {/*daca datele nu sunt incarcate arata aia  */}
        {coins.length > 0 && (
          <CoinChart coins={coins.slice(0, 10)} />
        )}

        <div className="table-card">
          {coins.length === 0 ? (
            <p className="loading-text">Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th> {/* îl ajută pe  să știe care rând este fiecare monedă.*/}
                  <th>Price</th>
                  <th>24h Change</th> {/*primul cuvant estel  dupa al 2*/}
                  <th>Favorite</th> {/*lea tece prin fiecare cuvant si face un numele gen dupa<*/}
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