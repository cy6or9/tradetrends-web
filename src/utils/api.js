const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export async function fetchStockData(symbol) {
    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");
    const response = await fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${apiKey}`);
    return response.json();
}

export async function fetchStockNews(symbol) {
    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");
    const response = await fetch(`${FINNHUB_BASE_URL}/news?category=${symbol}&token=${apiKey}`);
    return response.json();
}
