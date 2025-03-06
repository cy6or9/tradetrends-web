const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export async function fetchStockData(symbol) {
    const response = await fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${process.env.VITE_FINNHUB_API_KEY}`);
    return response.json();
}

export async function fetchStockNews(symbol) {
    const response = await fetch(`${FINNHUB_BASE_URL}/news?category=${symbol}&token=${process.env.VITE_FINNHUB_API_KEY}`);
    return response.json();
}
