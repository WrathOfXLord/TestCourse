import { log } from "../middleware/logger.js";

import express from "express";

const customerRouter = express.Router();

const topMovies = ["Top Gun", "The Naked Gun", "Fight Club"];

const getCustomer = (id) => {
    return new Promise(resolve => {
        const customer = {
            id: id,
            name: "Ali",
            email: "alifirato@gmail.com",
            isGold: true,
        };
        log(`Customer: ${customer}`);
        resolve(customer);
    });
};

const getTopMovies = (isGold) => {
    return new Promise((resolve, reject) => {
        if(!isGold) {
            reject(new Error("The customer doesn't have a gold membership!"));
        }
        log(`Movies: ${topMovies}`);
        resolve(topMovies);
    });
};

const sendEmail = (isGold, email) => {
    return new Promise((resolve, reject) => {
        if(!isGold) {
            reject(new Error("The customer doesn't have a gold membership!"));
        }
        setTimeout(() => {
            log(`Email has been sent to ${email}.`);
            resolve();
        }, 1500);
    });
};

customerRouter.get("/:id", async (request, response) => {
    
    try {
        const customer = await getCustomer(request.params.id);
        const movies = await getTopMovies(customer.isGold);
        await sendEmail(customer.isGold, customer.email);

        response.status(200).send({
            topMovies: topMovies
        });
    } catch (error) {
        response.status(400).send({error: error.message});
    }
});


export default customerRouter;

