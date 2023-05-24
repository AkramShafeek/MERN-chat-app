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
    return 'http://localhost:3001/assets/group-avatar.jpeg';
  return (data.users[0]._id === user._id ? data.users[1].pic : data.users[0].pic)
}