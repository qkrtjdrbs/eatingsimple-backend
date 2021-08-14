import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    createRecipe: protectedResolver(
      async (_, { title, content, files, tags }, { loggedInUser }) => {
        try {
          let tagsList = null;
          if (tags?.length) {
            tagsList = tags.map((tag) => ({ where: { tag }, create: { tag } }));
          }
          const newRecipe = await client.recipe.create({
            data: {
              title,
              content,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(tags?.length > 0 && {
                tags: {
                  connectOrCreate: tagsList,
                },
              }),
            },
          });
          files?.forEach(async (file) => {
            const newFile = await uploadToS3(file, loggedInUser.id, "uploads");
            await client.photo.create({
              data: {
                file: newFile,
                user: {
                  connect: {
                    id: loggedInUser.id,
                  },
                },
                recipe: {
                  connect: {
                    id: newRecipe.id,
                  },
                },
              },
            });
          });
          return {
            ok: true,
            id: newRecipe.id,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
          };
        }
      }
    ),
  },
};
