import * as dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: process.env.PORT || 10001,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    token: process.env.TOKEN,
    expires_in: process.env.EXPIRES_IN
  },
  mysql: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "h_admin",
  },
  route: {
    whiteList: [
      '/admin/login',
      '/health'
    ]
  },
  mongodb: {},
  sqlite: {},
}
