import axios from "axios";
import { rootUrl } from "./config";

export const fetchChatsApi = async (token) => {
    try {        
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        const url = `${rootUrl}/api/chat`
        const response = await axios.get(url, config);        
        return response.data;
    } catch (error) {
        console.log(error);        
        throw error;
    }
}