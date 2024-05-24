// app/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface ApiResponse {
  answer: string;
  conversation_id: string;
}

export const sendMessage = async (message: string, conversationId: string = ""): Promise<ApiResponse> => {
  console.log("Sending message:", message);
  console.log("API Key:", API_KEY);
  console.log("Base URL:", BASE_URL);

  const body = JSON.stringify({
    query: message,
    inputs: {},
    response_mode: "blocking", // Using 'blocking' mode for simplicity
    conversation_id: conversationId,
    user: "unique_user_id", // Replace with a unique identifier for the user
  });

  console.log("Request body:", body);

  try {
    const response = await fetch(`${BASE_URL}/chat-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send message:", errorText);
      throw new Error("Failed to send message: " + errorText);
    }

    const jsonResponse = await response.json();
    console.log("Received response:", jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};
