import { Op } from "sequelize";
import { commentModel, postModel, userModel } from "../../db/models/index.js";

export const createComments = async (commentsData) => {
  try {
    const comments = await commentModel.bulkCreate(commentsData);
    return comments;
  } catch (error) {
    console.error("Error creating comments:", error);
    throw error;
  }
};

export const updateComment = async (commentId, userId, content) => {
  try {
    const comment = await commentModel.findByPk(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (comment.userId !== Number(userId)) {
      throw new Error("Unauthorized: You can only update your own comments");
    }
    await comment.update({ content });

    return comment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const findOrCreateComment = async (commentData) => {
  try {
    const { userId, postId, content } = commentData;
    const [comment, created] = await commentModel.findOrCreate({
      where: {
        userId,
        postId,
        content,
      },
      defaults: {
        userId,
        postId,
        content,
      },
    });

    return {
      comment,
      created,
    };
  } catch (error) {
    console.error("Error finding or creating comment:", error);
    throw error;
  }
};

export const searchComments = async (word) => {
  try {
    const comments = await commentModel.findAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    const count = await commentModel.count({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    return {
      count,
      comments,
    };
  } catch (error) {
    console.error("Error searching comments:", error);
    throw error;
  }
};

export const getNewestComments = async (postId) => {
  try {
    const comments = await commentModel.findAll({
      where: {
        postId,
      },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    return comments;
  } catch (error) {
    console.error("Error retrieving newest comments:", error);
    throw error;
  }
};

export const getCommentDetails = async (id) => {
  try {
    const comment = await commentModel.findByPk(id, {
      include: [
        {
          model: userModel,
          as: "author",
        },
        {
          model: postModel,
          as: "post",
        },
      ],
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    return comment;
  } catch (error) {
    console.error("Error retrieving comment details:", error);
    throw error;
  }
};
