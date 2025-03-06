exports.handler = async (event) => {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY; // Securely stored
    const symbol = event.queryStringParameters.symbol || 'AAPL';
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
