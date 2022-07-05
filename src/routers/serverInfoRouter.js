import { Router } from "express";
import serverInfoController from "../controllers/serverInfoController.js";

const serverInfoRouter = new Router();

serverInfoRouter.get('/', serverInfoController.getServerInfo);

export default serverInfoRouter;