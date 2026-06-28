import dotenv from "dotenv";
import path from "node:path";
import {
  fileURLToPath,
} from "node:url";

const currentFilePath =
  fileURLToPath(import.meta.url);

const currentDirectory =
  path.dirname(currentFilePath);

dotenv.config({
  path: path.resolve(
    currentDirectory,
    "../.env"
  ),
});