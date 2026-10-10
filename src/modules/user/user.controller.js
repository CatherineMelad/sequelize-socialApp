import { Router } from "express";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from "./user.service.js";
import { successResponse, errorResponse } from "../../common/utils/response.js";

export const userRouter = Router();

// Create a new user
userRouter.post("/createUser", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    successResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
});

// Update user
userRouter.put("/updateUser/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    successResponse(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
});

// Find user by email
userRouter.get("/userByEmail", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return errorResponse(res, 400, "Email is required");
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    successResponse(res, 200, "User found successfully", user);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
});

// get user by id
userRouter.get("/userById/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    successResponse(res, 200, "User found successfully", user);
  } catch (error) {
    if (error.message === "User not found") {
      return errorResponse(res, 404, "User not found");
    }
    errorResponse(res, 400, error.message);
  }
});
