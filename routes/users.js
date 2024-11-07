import express from "express";
import { log } from "../middleware/logger.js";

const userRouter = express.Router();

userRouter.get("/:id", async (request, response) => {
    try {
        const user = await getUser(request.params.id);
        const repos = await getRepositories(user.githubUsername);
        const repo = await getCommits(repos[1]);
        const userObj = { user, repos, repo };
        log(userObj);
        response.status(200).send(userObj);
    } catch (error) {
        log(error);
        response.status(500).send("An error occurred");
    }
});

function getCommits(repo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            log("Retrieving commits...");
            resolve({
                name: repo,
                commits: ["initial commit", "commit1", "commit2"]
            });
        }, 1000);
    });
}

function getRepositories(username) {
    return new Promise((resolve) => {
        setTimeout(() => {
            log("Calling Github API...");
            resolve(["repo1", "repo2", "repo3"]);
        }, 1000);
    });
}

function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            log("Reading user info...");
            resolve({ id: id, githubUsername: "Ali" });
        }, 1000);
    });
}

export default userRouter;
