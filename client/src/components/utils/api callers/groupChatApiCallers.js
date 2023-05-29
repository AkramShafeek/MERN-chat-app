import axios from "axios";
import { rootUrl } from "./config";

export const saveNewGroupNameApi = async (selectedChat, newGroupChatName, token) => {
  const payload = {
    chatId: selectedChat._id,
    chatName: newGroupChatName,
  }
  const url = `${rootUrl}/api/chat/grouprename`;
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
  const url = `${rootUrl}/api/chat/groupremove`;
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
  const url = `${rootUrl}/api/chat/groupadd`;
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

export const createGroupApi = async (groupChatName, selectedUsers, token) => {
  if (!groupChatName || !selectedUsers.length)
    return null;
  try {
    const url = `${rootUrl}/api/chat/group`;
    const payload = {
      name: groupChatName,
      users: selectedUsers
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    const response = await axios.post(url, payload, config);
    return response.data;
  } catch (error) {
    console.log("some error boss");
    throw error;
  }
}
