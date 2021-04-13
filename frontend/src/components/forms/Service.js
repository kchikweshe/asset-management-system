import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ServiceAPI {


    static async createEmployee(user) {

        const url = `${API_URL}/dj-rest-auth/registration/`;
        return await axios.post(url, user)
    }

    static async createAddress(address, token) {

        const url = `${API_URL}/api/address/`;
        return await axios.post(url, address, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }


    static registerEmployee(employee, token) {

        const url = `${API_URL}/api/employee/`;
        return axios.post(url, employee, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }



    static async getAll(collection, token) {
        console.info(`Token : ${token}`)
        const url = `${API_URL}/api/${collection}/`;
        return await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    static async getEmployeeData(employee_id, token) {

        console.info(`Token : ${token}`)
        console.info(`empId : ${employee_id}`)
        const url = `${API_URL}/api/employees/${employee_id}/`;
        return await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static async getWorkOrders(employee_id, token){
        console.info(`Token : ${token}`)
        console.info(`empId : ${employee_id}`)
        const url = `${API_URL}/api/work_orders/${employee_id}/`;
        return await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}