import axios from "axios";

export const sendMessageApi = async (selectedChat, message, token) => {
    const payload = {
        content: message,
        chatId: selectedChat._id,
    }
    const url = "http://localhost:3001/api/message/";
    const config = {
        headers: {
            'Content-type': "application/json",
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
