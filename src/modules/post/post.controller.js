import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsWithCommentCount,
} from "./post.service.js";
import { successResponse, errorResponse } from "../../common/utils/response.js";

export const postRouter = Router();

// create post
postRouter.post("/createPost", async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    successResponse(res, 201, "Post created successfully", newPost);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
});

// delete post
postRouter.delete("/deletePost/:id", async (req, res) => {
  try {
    const deletedPost = await deletePost(req.params.id, req.body.userId);
    successResponse(res, 200, "Post deleted successfully", deletedPost);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
});

// get all posts
postRouter.get("/getAllPosts", async (req, res) => {
  try {
    const posts = await getAllPosts();
    successResponse(res, 200, "Posts fetched successfully", posts);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
});

// get posts with comment count
postRouter.get("/comment-count", async (req, res) => {
  try {
    const posts = await getPostsWithCommentCount();
    return successResponse(
      res,
      200,
      "Posts and comment counts retrieved successfully",
      posts,
    );
  } catch (error) {
    return errorResponse(res, 500, "Internal server error");
  }
});
