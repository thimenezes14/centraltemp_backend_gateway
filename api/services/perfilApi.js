const axios = require('axios').default;
const URL = process.env.MSVC_PERFIS;
const pathName = '/perfis';

module.exports = req => {
    const api = axios.create({
        baseURL: `http://${URL}${pathName}`
    });
    
    api.interceptors.request.use(async config => {
        config.headers.Authorization = `Bearer ${req.headers.authorization.split(" ")[1]}`;
        console.log(config.headers.Authorization);
        return config;
    });

    return api;
}