export async function fetchCoins() {
    const response = await fetch(
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
    );

    const data = await response.json();
    return data.Data;
}