import axios from "axios";
import { rootUrl } from "./config";

export const sendMessageApi = async (selectedChat, message, token) => {
    const payload = {
        content: message,
        chatId: selectedChat._id,
    }
    const url = `${rootUrl}/api/message/`;
    const config = {
        headers: {
            'Content-type': `application/json`,
            'Authorization': `Bearer ${token}`,
        }
    }
    try {
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchMessagesApi = async (selectedChat, token) => {
    try {
        const url = `${rootUrl}/api/message/${selectedChat._id}`;
        const config = {
            headers: {                
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
