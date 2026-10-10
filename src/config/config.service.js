import { config } from "dotenv";
import { resolve } from "path";

const envPath = `.env.${process.env.NODE_ENV || "development"}`;

config({ path: resolve(envPath) });

export const PORT = Number(process.env.PORT);
export const dbConfig = {
  db_Name: process.env.DB_NAME,
  db_User: process.env.DB_USER,
  db_Password: process.env.DB_PASSWORD,
  db_Host: process.env.DB_HOST,
  db_Dialect: process.env.DB_DIALECT,
  db_Max: Number(process.env.DB_MAX),
  db_Min: Number(process.env.DB_MIN),
};
