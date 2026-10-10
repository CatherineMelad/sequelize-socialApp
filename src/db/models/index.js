import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";
import { commentModel } from "./comment.model.js";

export { userModel } from "./user.model.js";
export { postModel } from "./post.model.js";
export { commentModel } from "./comment.model.js";

// Define associations
postModel.belongsTo(userModel, {
  foreignKey: "userId",
  as: "author",
});

userModel.hasMany(postModel, {
  foreignKey: "userId",
  as: "posts",
});

commentModel.belongsTo(postModel, {
  foreignKey: "postId",
  as: "post",
});

postModel.hasMany(commentModel, {
  foreignKey: "postId",
  as: "comments",
});

commentModel.belongsTo(userModel, {
  foreignKey: "userId",
  as: "author",
});

userModel.hasMany(commentModel, {
  foreignKey: "userId",
  as: "comments",
});
