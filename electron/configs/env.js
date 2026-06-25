import dotenv from "dotenv"
import { paths } from "./paths.js"

dotenv.config({ path: paths.envFile })

export const APP_NAME = process.env.APP_NAME || "Abarrotes POS"
export const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || "localhost"
export const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT || 5173
export const DATABASE_FILE_PATH = process.env.DATABASE_PATH || "abarrotes-pos.sqlite"

export const DEV_SERVER_URL = `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`

