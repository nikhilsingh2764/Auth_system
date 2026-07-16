import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

// Creates a reusable Axios instance. prevent repeating baseURL, headers and configuration in every API-call
////Sends cookies automatically with every request.
//// Sets default HTTP headers for every request. //saying to backend we are sending JSON