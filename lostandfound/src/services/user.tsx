import axios from 'axios'

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
    await axios.post("http://localhost:3000/user/create", user);
};


export const login = async (user: any) => {

    const response = await axios.post('http://localhost:5000/login', user)

    return response.data

}


export const updateInfo = async (user: any) => {

    const response = await axios.put('http://localhost:5000/update', user)

    return response.data

}

export const updatePassword = async (user: any) => {

    const response = await axios.put('http://localhost:5000/updatepassword', user)

    return response.data

}


export const updateAddress = async (user: any) => {

    const response = await axios.put('http://localhost:5000/updateaddress', user)

    return response.data

}
