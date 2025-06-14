import axios from "axios";
import { BASE_URL } from "../../config";

const getUsers = async (id = "") => {
    try{
        const url = !id  ? `${BASE_URL}/api/users` : `${BASE_URL}/api/users/${id}`;
        const response = await axios.get(
            url
        );
        console.log("Users received: ",response.data);
        return response.data;
    } 
    catch(error){
        console.error(error.response?.data?.error || error.message);
        throw new Error(error.response?.data?.error || "Something went wrong");
    }
};

export default getUsers;