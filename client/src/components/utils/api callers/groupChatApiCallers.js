import axios from "axios";

export const saveNewGroupNameApi = async (selectedChat, newGroupChatName, token) => {
  const payload = {
    chatId: selectedChat._id,
    chatName: newGroupChatName,
  }
  const url = "http://localhost:3001/api/chat/grouprename";
  const config = {
    headers: {
      'Content-type': "application/json",
      'Authorization': `Bearer ${token}`,
    }
  }
  try {
    const response = await axios.put(url, payload, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const removeUserFromGroupApi = async (selectedChat, selectedUser, token) => {
  const payload = {
    chatId: selectedChat._id,
    userId: selectedUser._id,
  }
  const url = "http://localhost:3001/api/chat/groupremove";
  const config = {
    headers: {
      'Content-type': "application/json",
      'Authorization': `Bearer ${token}`,
    }
  }
  try {
    const response = await axios.put(url, payload, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const addUsersToGroupApi = async (selectedChat, selectedUsers, token) => {
  const payload = {
    chatId: selectedChat._id,
    userIds: selectedUsers.map(user => user._id),
  }
  const url = "http://localhost:3001/api/chat/groupadd";
  const config = {
    headers: {
      'Content-type': "application/json",
      'Authorization': `Bearer ${token}`,
    }
  }
  try {
    const response = await axios.put(url, payload, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
