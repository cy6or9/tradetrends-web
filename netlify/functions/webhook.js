export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const secretHeader = event.headers["x-finnhub-secret"] || event.headers["X-Finnhub-Secret"];
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    const expectedSecret = process.env.EXPECTED_WEBHOOK_SECRET; // Set this in your environment variables

    console.log("Received secret header:", secretHeader); // Debugging log
    console.log("FINNHUB_API_KEY:", FINNHUB_API_KEY); // Debugging log
    console.log("EXPECTED_WEBHOOK_SECRET:", expectedSecret); // Debugging log

    // Validate the Webhook secret
    if (secretHeader !== expectedSecret) {
        console.log("Secret mismatch:", secretHeader, expectedSecret); // Debugging log
        return { statusCode: 401, body: "Unauthorized" };
    }

    try {
        console.log("Received event body:", event.body); // Debugging log
        let payload = event.body;
        if (typeof payload === 'string') {
            payload = JSON.parse(payload);
        }
        console.log("Received Webhook Event:", payload);

        // TODO: Process the received stock data and update Firestore or cache

        return { statusCode: 200, body: "Webhook received successfully" };
    } catch (error) {
        console.error("Error processing Webhook:", error.message, error.stack); // Improved error logging
        return { statusCode: 500, body: "Internal Server Error" };
    }
}
