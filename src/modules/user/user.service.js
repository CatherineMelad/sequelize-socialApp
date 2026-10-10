import { userModel } from "../../db/models/user.model.js";
import { ValidationError, UniqueConstraintError } from "sequelize";

export const createUser = async (userData) => {
  let { name, email, password } = userData;
  const existingUser = await userModel.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  try {
    const newUser = userModel.build({ name, email, password });
    await newUser.save();
    return newUser;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new Error(error.errors.map((e) => e.message).join(", "));
    }
    if (error instanceof UniqueConstraintError) {
      throw new Error("User with this email already exists");
    }
  }
};

export const updateUser = async (id, userData) => {
  try {
    const user = await userModel.findByPk(id);
    if (!user) {
      user = await userModel.create({ id, ...userData }, { validate: false });
      return user;
    }
    await user.update(userData, { validate: false });
    return user;
  } catch (error) {
    throw new Error("Error updating or creating user: " + error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await userModel.findByPk(id, {
      attributes: { exclude: ["role"] },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};
