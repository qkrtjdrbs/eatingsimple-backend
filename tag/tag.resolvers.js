import client from "../client";

export default {
  Tag: {
    recipes: ({ id }) => client.tag.findUnique({ where: { id } }).recipes(),
  },
};
