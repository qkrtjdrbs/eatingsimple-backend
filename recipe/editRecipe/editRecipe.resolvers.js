import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    editRecipe: protectedResolver(
      async (_, { id, title, content, files }, { loggedInUser }) => {
        const recipe = await client.recipe.findUnique({ where: { id } });
        if (!recipe) {
          return {
            ok: false,
            error: "Recipe not exist",
          };
        }
        if (recipe.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not Authorized",
          };
        }
        if (files) {
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
                    id,
                  },
                },
              },
            });
          });
        }
        await client.recipe.update({
          where: { id },
          data: {
            title,
            content,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
