import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    createRecipe: protectedResolver(
      async (_, { title, content, files }, { loggedInUser }) => {
        try {
          const newRecipe = await client.recipe.create({
            data: {
              title,
              content,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
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
