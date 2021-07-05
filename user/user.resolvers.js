export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => id === loggedInUser.id,
  },
};
