import axios from "axios";
import { BASE_URL } from "../../config";

const editUser = async ({email, first_name, last_name, age, country, id, username}) => {
    try{
        if (!email || !first_name || !last_name || !age || !country || !id || !username) {
            throw new Error("Missing required post fields");
        }
        const url = `${BASE_URL}/api/users/${id}`;
        const data = {email, first_name, last_name, age, country}
        const response = await axios.put(
            url,
            data
        );
        console.log("User edited: ",response.data);
        return response.data;
    } 
    catch(error){
        console.error(error.response?.data?.error || error.message);
        throw new Error(error.response?.data?.error || "Something went wrong");
    }
};

export default editUser;