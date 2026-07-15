import axios from "axios";

const api = axois.create({  // Creates a reusable Axios instance. prevent repeating baseURL, headers and configuration in every API-call

    baseURL: import.meta.env.VITE_API_URL,

    withCredentials: true,  //Sends cookies automatically with every request.

    headers: { // Sets default HTTP headers for every request. //saying to backend we are sending JSON
        "Content-Type": "application/json",
    },


});

export default api;