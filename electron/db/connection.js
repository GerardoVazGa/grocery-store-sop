import Database from "better-sqlite3"
import fs from "fs"
import path from "path"
import { app } from "electron"
import { DATABASE_FILE_PATH } from "../configs/env.js"
import { paths } from "../configs/paths.js"

const dbPath = path.join(app.getPath("userData"), DATABASE_FILE_PATH)
console.log("DB path:", dbPath)

const db = new Database(dbPath)

db.pragma("journal_mode = WAL")

const initMigration = fs.readFileSync(
    path.join(paths.migrations, "001_init.sql"),
    "utf-8"
)

db.exec(initMigration)

export default db