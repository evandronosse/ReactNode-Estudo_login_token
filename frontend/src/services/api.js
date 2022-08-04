import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333',
})
export const createSession = async (email, password) => {
    //a minha api ta funcionando?
    return api.post('/sessions', { email, password })

}