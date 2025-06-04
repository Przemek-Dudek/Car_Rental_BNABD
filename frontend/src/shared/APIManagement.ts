const BASE_URL = "http://localhost:8080/api/v1";

export const apiRequest = async (method, endpoint, body, headers = {}) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || "Request failed"}`);
    }

    return response;
};