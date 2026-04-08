import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    async function fetchCoin() {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD`
      );
      const data = await response.json();

      const found = data.Data.find(
        (c) => c.CoinInfo.Name === id
      );

      setCoin(found);
    }

    fetchCoin();
  }, [id]);

  if (!coin) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h1>{coin.CoinInfo.FullName}</h1>

      <p><strong>Symbol:</strong> {coin.CoinInfo.Name}</p>
      <p><strong>Price:</strong> {coin.DISPLAY.USD.PRICE}</p>
      <p><strong>Market Cap:</strong> {coin.DISPLAY.USD.MKTCAP}</p>
      <p><strong>24h Change:</strong> {coin.DISPLAY.USD.CHANGEPCT24HOUR}%</p>
      <p><strong>Volume:</strong> {coin.DISPLAY.USD.VOLUME24HOUR}</p>
    </div>
  );
}

export default CoinDetails;