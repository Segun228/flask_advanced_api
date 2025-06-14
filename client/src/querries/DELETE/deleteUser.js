import axios from "axios";
import { BASE_URL } from "../../config";

const deleteUser = async (id) => {
    if(!id){
        throw new Error("invalid user id")
    }
    try{
        const url = `${BASE_URL}/api/users/${id}`;
        const response = await axios.delete(
            url
        );
        console.log("User deleted: ",response.data);
        return response.data;
    } 
    catch(error){
        console.error(error.response?.data?.error || error.message);
        throw new Error(error.response?.data?.error || "Something went wrong");
    }
};

export default deleteUser;