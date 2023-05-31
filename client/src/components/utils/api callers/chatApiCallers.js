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

export const accessChatApi = async (user, token) => {
    try {
      const url = `${rootUrl}/api/chat/`;
      const config = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const payload = { userId: user._id };
      const response = await axios.post(url, payload, config);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }