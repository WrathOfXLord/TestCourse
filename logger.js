export default function log(request, response, next) {
    console.log("Logging...");
    next();
}