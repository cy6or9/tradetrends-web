export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const secretHeader = event.headers["x-finnhub-secret"];
    const expectedSecret = "cuvuc2hr01qub8tvmkrgcuvuc2hr01qub8tvmks0";  // Replace with your actual secret

    // Validate the Webhook secret
    if (secretHeader !== expectedSecret) {
        return { statusCode: 401, body: "Unauthorized" };
    }

    try {
        const payload = JSON.parse(event.body);
        console.log("Received Webhook Event:", payload);

        // TODO: Process the received stock data and update Firestore or cache

        return { statusCode: 200, body: "Webhook received successfully" };
    } catch (error) {
        console.error("Error processing Webhook:", error);
        return { statusCode: 500, body: "Internal Server Error" };
    }
}
