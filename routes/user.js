import express from "express";
import { createUser, getUser } from "../controllers/user.js";

const routes = express.Router();

routes.get('/',getUser)
routes.post('/',createUser)

export default routes;