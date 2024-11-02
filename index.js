import express from "express"
import CourseRoutes from "./CourseRouter.js"
import log from "./logger.js";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(log);
app.use(helmet());
app.use("/api/v1/courses", CourseRoutes);

if(app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("Morgan enabled...");
}

app.get("/", (request, response) => {
    response.json({
        status: response.statusCode,
        message: "Hello World"
    });
});

app.get("/api/v1", (request, response) => {
    response.send("Welcome to the API Information Page!");
});

app.listen(PORT, () => {
    console.log(`Server is runing on ${PORT}...`);
});