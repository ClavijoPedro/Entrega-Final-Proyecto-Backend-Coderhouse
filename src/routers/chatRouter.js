import { Router } from "express";
import chatController from "../controllers/chatController.js";
import isAuth from "../middlewares/isAuth.js";

const chatRouter = new Router();

chatRouter.get('/', chatController.getChat);

chatRouter.get('/:email', isAuth, chatController.getChatMessagesByEmail);

export default chatRouter;