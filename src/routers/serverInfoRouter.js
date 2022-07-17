import { Router } from "express";
import serverInfoController from "../controllers/serverInfoController.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";

const serverInfoRouter = new Router();

serverInfoRouter.get('/', isAuth, isAdmin, serverInfoController.getServerInfo);

export default serverInfoRouter;