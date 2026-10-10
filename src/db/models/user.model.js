import { DataTypes } from "sequelize";
import { sequelize } from "../connections.js";

export let userModel = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 255],
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error("Password must be longer than 6 characters");
          }
        },
      },
    },
    role: {
      type: DataTypes.STRING(255),
      Enum: ["user", "admin"],
      defaultValue: "user",
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [["user", "admin"]],
      },
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        checkNameLength(user.name);
      },
    },
  },
);

function checkNameLength(name) {
  if (name.length <= 2) {
    throw new Error("Name must be longer than 2 characters");
  }
}
