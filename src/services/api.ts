import axios from 'axios';

const api = axios.create({
    baseURL: "https://mobile-med-api.herokuapp.com"
});

export default api;