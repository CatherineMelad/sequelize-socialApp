import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config.service.js";

export const sequelize = new Sequelize(
  dbConfig.db_Name,
  dbConfig.db_User,
  dbConfig.db_Password,
  {
    host: dbConfig.db_Host,
    dialect: dbConfig.db_Dialect,
    pool: {
      max: dbConfig.db_Max,
      min: dbConfig.db_Min,
    },
  },
);

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    console.log("Database connected");
  } catch (error) {
    console.log("Database Error: ", error);
    process.exit(1);
  }
};
