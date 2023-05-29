import axios from "axios";
import { rootUrl } from "../api callers/config";

const searchUsers = async (search, token) => {

  if (!search)
    return;

  try {
    const url = `${rootUrl}/user/auth/allUsers?searchuser=${search}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, config);
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.log(error.response.data.msg);
  }
}


export default searchUsers;