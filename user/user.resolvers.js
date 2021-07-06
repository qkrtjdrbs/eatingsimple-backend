export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (loggedInUser) return id === loggedInUser.id;
      else return false;
    },
  },
};
