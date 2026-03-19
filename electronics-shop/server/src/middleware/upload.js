import fs from "fs";
import path from "path";
import multer from "multer";
import { paths } from "../config/env.js";

fs.mkdirSync(paths.uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, paths.uploadsDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});

export const upload = multer({ storage });
