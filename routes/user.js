import express from "express";
import { createUser, getUser } from "../controllers/user.js";

const routes = express.Router();

routes.post("/login", getUser);
routes.post("/signup", createUser);


export default routes;
