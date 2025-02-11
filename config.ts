import dotenv from "dotenv"
 
dotenv.config()
 
export default {
  database: {
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  server: {
    port: Number.parseInt(process.env.PORT || "3000"),
  },
}