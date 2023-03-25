import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,

});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!error.response) {
        return console.log(error);
    }

    if (error.response.status === 401) {
        if (window.location.pathname !== '/login') {
            window.location.pathname = '/login';
        }
    }

    return error.response;
});