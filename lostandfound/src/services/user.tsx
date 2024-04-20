import axios from 'axios'

const API_URL = process.env.BACKEND_URL || 'https://lost-found-api-d361.onrender.com'

export interface IUserRequest {
    name: string;
    phone?: string;
    email: string;
    password: string;
    address?: {
        zipcode: string;
        address: string;
        number: string;
    };
}


export const createUser = async (user: IUserRequest) => {

    try {
        const response = await axios.post(`${API_URL}/user/create`, user);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        console.error(error)
    }

};


export const login = async (email:string, password:string) => {

    const response = await axios.post(`${API_URL}/user/login`, {email, password})

    return response.data

}


export const updateInfo = async (userId:number,data:any) => {

    const response = await axios.put(`${API_URL}/${userId}`,data)

    return response.data

}

export const updatePassword = async (user: any) => {

    const response = await axios.put(`${API_URL}/updatepassword`, user)

    return response.data

}


export const updateAddress = async (userId:number,data:any) => {

    const response = await axios.put(`${API_URL}/user/address/${userId}`, data)

    return response.data

}
