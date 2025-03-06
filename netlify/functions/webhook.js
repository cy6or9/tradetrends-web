export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const secretHeader = event.headers["x-finnhub-secret"] || event.headers["X-Finnhub-Secret"];
    const expectedSecret = process.env.EXPECTED_WEBHOOK_SECRET; // Set this in your environment variables

    console.log("Received secret header:", secretHeader); // Debugging log
    console.log("EXPECTED_WEBHOOK_SECRET:", expectedSecret); // Debugging log

    // Validate the Webhook secret
    if (secretHeader !== expectedSecret) {
        console.log("Secret mismatch:", secretHeader, expectedSecret); // Debugging log
        return { statusCode: 401, body: "Unauthorized" };
    }

    // Acknowledge receipt of the event immediately with a 200 response
    // Finnhub needs this early 2xx status to prevent timeouts and retries
    console.log("Webhook received and acknowledged successfully.");
    // Do not perform heavy processing here (like parsing the body or querying services)

    // Process the event asynchronously after acknowledgment
    try {
        const payload = JSON.parse(event.body);
        console.log("Received Webhook Event:", payload);

        // TODO: Process the received stock data and update Firestore or cache asynchronously

        // Return success after acknowledging
        return { statusCode: 200, body: "Webhook received successfully" };
    } catch (error) {
        console.error("Error processing Webhook:", error.message, error.stack); // Improved error logging
        return { statusCode: 500, body: "Internal Server Error" };
    }
}
