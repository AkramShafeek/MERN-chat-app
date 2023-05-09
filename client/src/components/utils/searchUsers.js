import axios from "axios";

const searchUsers = async (search, token) => {


  if (!search)
    return;

  try {
    const url = `http://localhost:3001/user/auth/allUsers?searchuser=${search}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, config);
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.log(error);
  }
}


export default searchUsers;