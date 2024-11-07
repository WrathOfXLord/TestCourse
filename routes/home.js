import express from "express"
import { marked } from "marked";
import fs from "fs"

import mdFile from "../index.js";

const homeRouter = express.Router();

homeRouter.get("/", (request, response) => {
    fs.readFile(mdFile, "utf8", (err, data) => {
        if (err) return response.status(500).send("An Error Has Occured!");

        const content = marked(data);
        response.status(200).send(content);
    });
});

homeRouter.get("/api/v1", (request, response) => {
    response.status(200).render("index", {
        title: "My App",
        message: "Welcome to the the API documentation page!"
    });
});

export default homeRouter;