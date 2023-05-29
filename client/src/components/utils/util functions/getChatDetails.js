import { rootUrl } from "../api callers/config";

export const getChatName = (data, user) => {
  if (data.isGroupChat)
    return data.chatName;
  return (data.users[0]._id === user._id ? data.users[1].name : data.users[0].name)
}

export const getOppUserEmail = (data, user) => {
  if (data.isGroupChat)
    return undefined;
  return (data.users[0]._id === user._id ? data.users[1].email : data.users[0].email)
}

export const getUserAvatar = (data, user) => {
  if (data.isGroupChat)
    return `${rootUrl}/assets/group-avatar.jpeg`;  
  return (data.users[0]._id === user._id ? `${rootUrl}/assets/${data.users[1].pic}` : `${rootUrl}/assets/${data.users[0].pic}`)
}