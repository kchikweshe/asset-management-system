import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ServiceAPI {


   static createEmployee(employee) {

        const url = `${API_URL}/dj-rest-auth/registration/`;
        return axios.post(url, employee)  
    }


  static  getAll(collection,token) {
        console.info(`Token : ${token}`)
        const url = `${API_URL}/api/${collection}/`;
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    }

}