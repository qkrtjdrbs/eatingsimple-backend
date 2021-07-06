import client from "../client";

export default {
  Recipe: {
    photos: ({ id }) => client.photo.findMany({ where: { recipeId: id } }),
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
  },
};
