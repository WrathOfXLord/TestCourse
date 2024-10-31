import express from "express"
import CourseRoutes from "./CourseRouter.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/courses", CourseRoutes);

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