import { Router } from "express";
import {
  createComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  getNewestComments,
  getCommentDetails,
} from "./comment.service.js";
import { successResponse, errorResponse } from "../../common/utils/response.js";

export const commentRouter = Router();

// Create comments
commentRouter.post("/createComments", async (req, res) => {
  try {
    const commentsData = req.body;

    if (!Array.isArray(commentsData) || commentsData.length === 0) {
      return errorResponse(
        res,
        400,
        "Request body must be a non-empty array of comments",
      );
    }

    const comments = await createComments(commentsData);

    return successResponse(res, 201, "Comments created successfully", comments);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
});

// Update comment
commentRouter.put("/updateComment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return errorResponse(res, 400, "userId and content are required");
    }
    const updatedComment = await updateComment(commentId, userId, content);
    return successResponse(
      res,
      200,
      "Comment updated successfully",
      updatedComment,
    );
  } catch (error) {
    if (error.message === "Comment not found") {
      return errorResponse(res, 404, error.message);
    }
    if (error.message.startsWith("Unauthorized")) {
      return errorResponse(res, 403, error.message);
    }
    return errorResponse(res, 500, error.message);
  }
});

// Find or create comment
commentRouter.post("/findComment", async (req, res) => {
  try {
    const { userId, postId, content } = req.body;
    if (!userId || !postId || !content) {
      return errorResponse(
        res,
        400,
        "userId, postId, and content are required",
      );
    }
    const { comment, created } = await findOrCreateComment({
      userId,
      postId,
      content,
    });

    return successResponse(
      res,
      created ? 201 : 200,
      created ? "Comment created successfully" : "Comment already exists",
      comment,
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
});

// Search comments by word
commentRouter.get("/search", async (req, res) => {
  try {
    const { word } = req.query;

    if (!word || typeof word !== "string" || !word.trim()) {
      return errorResponse(res, 400, "Please provide a valid search word");
    }

    const result = await searchComments(word.trim());

    return successResponse(res, 200, "Comments retrieved successfully", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
});

// Get newest comments for a post
commentRouter.get("/newest/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await getNewestComments(postId);
    return successResponse(
      res,
      200,
      "Newest comments retrieved successfully",
      comments,
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
});

// Get comment details by ID
commentRouter.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await getCommentDetails(id);
    return successResponse(
      res,
      200,
      "Comment details retrieved successfully",
      comment,
    );
  } catch (error) {
    if (error.message === "Comment not found") {
      return errorResponse(res, 404, error.message);
    }
    return errorResponse(res, 500, error.message);
  }
});
