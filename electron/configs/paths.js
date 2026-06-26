import {fileURLToPath} from 'url'
import path from 'path'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '../..')

export const paths = {
    electronRoot: path.resolve(__dirname, '..'),
    projectRoot,
    envFile: path.resolve(projectRoot, '.env'),
    preload: path.resolve(__dirname, '../preload/preload.cjs'),
    distIndex: path.resolve(__dirname, '../../dist/index.html'),
    migrations: path.resolve(__dirname, '../db/migrations'),

}