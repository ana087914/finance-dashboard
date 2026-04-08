import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CoinChart({ coins }) {
  const data = {
    labels: coins.map((coin) => coin.CoinInfo.Name),
    datasets: [
      {
        data: coins.map((coin) => coin.RAW.USD.MKTCAP),
        backgroundColor: [
          "#9F84BD",
          "#C09BD8",
          "#EBC3DB",
          "#EDE3E9",
          "#E6E4CE",
          "#bba6d6",
          "#d4b5e9",
          "#f0d4e8",
          "#dcd0e6",
          "#f3f1d9",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <Pie data={data} />
    </div>
  );
}

export default CoinChart;