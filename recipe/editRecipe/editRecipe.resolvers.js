import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    editRecipe: protectedResolver(
      async (_, { id, title, content, files, tags }, { loggedInUser }) => {
        try {
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
              const newFile = await uploadToS3(
                file,
                loggedInUser.id,
                "uploads"
              );
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
          let tagsList = null;
          if (tags?.length) {
            tagsList = tags.map((tag) => ({ where: { tag }, create: { tag } }));
          }
          await client.recipe.update({
            where: { id },
            data: {
              title,
              content,
              ...(tags?.length > 0 && {
                tags: {
                  connectOrCreate: tagsList,
                },
              }),
            },
          });
          return {
            ok: true,
          };
        } catch (e) {
          return {
            ok: false,
            error: "레시피 수정에 실패했습니다.",
          };
        }
      }
    ),
  },
};
