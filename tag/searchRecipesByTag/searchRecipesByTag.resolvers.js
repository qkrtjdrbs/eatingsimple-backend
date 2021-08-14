import client from "../../client";

export default {
  Query: {
    searchRecipesByTag: (_, { tag }) =>
      client.tag.findUnique({ where: { tag } }).recipes(),
  },
};
