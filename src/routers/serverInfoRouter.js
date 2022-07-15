import { Router } from "express";
import serverInfoController from "../controllers/serverInfoController.js";
import isAdmin from "../middlewares/isAdmin.js";

const serverInfoRouter = new Router();

serverInfoRouter.get('/', serverInfoController.getServerInfo);

export default serverInfoRouter;