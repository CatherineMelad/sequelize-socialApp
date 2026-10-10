import { postModel, userModel, commentModel } from "../../db/models/index.js";
import { Sequelize } from "sequelize";

export const createPost = async (postData) => {
  const { title, content, userId } = postData;

  try {
    const newPost = postModel.build({
      title,
      content,
      userId,
    });

    await newPost.save();

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (postId, userId) => {
  try {
    const post = await postModel.findByPk(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    if (post.userId !== userId) {
      throw new Error("Unauthorized to delete this post");
    }
    await post.destroy();
    return post;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title"],
      include: [
        { model: userModel, as: "author", attributes: ["id", "name"] },
        { model: commentModel, as: "comments", attributes: ["id", "content"] },
      ],
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostsWithCommentCount = async () => {
  try {
    const posts = await postModel.findAll({
      attributes: [
        "id",
        "title",
        "content",
        [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"],
      ],

      include: [
        {
          model: commentModel,
          as: "comments",
          attributes: [],
        },
      ],
      group: ["Post.id"],
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts with comment count:", error);

    throw error;
  }
};
