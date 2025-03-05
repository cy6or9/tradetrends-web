import axios from "axios";

const API_KEY = "cuvuc2hr01qub8tvmkrgcuvuc2hr01qub8tvmks0";

export const getStockData = async () => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${API_KEY}`
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
