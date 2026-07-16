import api from "../api/axios";

export const signup = async (data) => {

    const response = await api.post(
        '/Signup',
        data
    )

    return response.data;


};