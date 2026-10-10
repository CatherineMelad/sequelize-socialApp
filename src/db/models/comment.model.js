import { sequelize } from "../connections.js";
import { DataTypes, Model } from "sequelize";

class Comment extends Model {}
Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize, timestamps: true },
);

export const commentModel = Comment;
