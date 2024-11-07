import express from "express"
import debug from "debug";
import config from "config";
import morgan from "morgan";
import helmet from "helmet";

import fs from "fs"
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

import HomeRoutes from "./routes/home.js"
import CourseRoutes from "./routes/courses.js"
import logger, {log} from "./middleware/logger.js";
import chalk from "chalk";
import UserRoutes from "./routes/users.js";
import customerRouter from "./routes/customers.js";

const startupDebugger = debug("app:startup");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFilePath = path.join(__dirname, 'application.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

// console.log(`App Name: ${config.get("name")}`);
// console.log(`Mail Server: ${config.get("mail.host")}`);
// console.log(`Mail Password: ${config.get("mail.password")}`);

if (process.env.NODE_ENV === "development") {
    app.use((req, res, next) => logger(req, res, next, true, logStream));
    log("Logger enabled for development...");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

const mdFile = path.join(__dirname, "..", "readme.md");
export default mdFile;

app.use("/", HomeRoutes);
app.use("/api/v1/courses", CourseRoutes);
app.use("/api/v1/users", UserRoutes)
app.use("/api/v1/customers", customerRouter);

app.listen(PORT, () => {
    log(chalk.blue.bold(`Server is runing on ${chalk.greenBright(PORT)}...`));
});