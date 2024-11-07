import express from "express"
import Joi from "joi";
import { log } from "../middleware/logger.js";

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
];

const courseRouter = express.Router();

courseRouter.get("/", (request, response) => {
    response.send(courses);
});

courseRouter.get("/:id", (request, response) => {
    const course = courses.find(course => {
        return course.id === parseInt(request.params.id); 
    })
    if(!course) {
        return response.status(404).send("No such course with the given ID!");
    }
    response.send(course);
});

courseRouter.post("/", (request, response) => {
    
    const {error} = validateCourse(request.body);
    if(error) {
        const errors = error.details.map(detail => detail.message);
        return response.status(400).send(errors);
    }
 
    createUser(request.body.name, course => {
        courses.push(course);
        response.status(201).send(course);
        log(course);
    });    
});

const createUser = (name, callback) => {
    const course = {
        id: courses.length + 1,
        name: name
    };

    const delay = 500 //ms
    setTimeout(() => {
        console.log("Creating a new user...");
        callback(course);
    }, delay);
        
}

courseRouter.put("/:id", (request, response) => {
    const course = courses.find(course => course.id === parseInt(request.params.id));
    if(!course) {
        return response.status(404).send("No such course with the given ID!");
    }

    const {error} = validateCourse(request.body);
    if(error) {
        const errors = error.details.map(detail => detail.message);
        return response.status(400).send(errors);
    }

    course.name = request.body.name;
    response.status(200).send(course);
});

courseRouter.delete("/:id", (request, response) => {
    let index = -1;
    const course = courses.find(course => {
        ++index;
        return course.id === parseInt(request.params.id)
    });

    if(!course) {
        return response.status(404).send("No such course with the given ID!");
    }
    console.log(courses[index], index);
    courses.splice(index, 1);
    response.status(200).send(course);
});

const validateCourse = (course) => {
    const courseSchema = Joi.object({
        name: Joi.string().min(3).max(128).required()
    });
    return courseSchema.validate(course);
}

export default courseRouter;