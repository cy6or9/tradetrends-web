import axios from "axios";

export const getStockData = async () => {
  try {
    const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

    if (!FINNHUB_API_KEY) {
      throw new Error("Missing Finnhub API key");
    }

    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${FINNHUB_API_KEY}`
    );

    return [
      {
        symbol: "AAPL",
        price: response.data.c,
        change: response.data.d,
      },
    ];
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return [];
  }
};
