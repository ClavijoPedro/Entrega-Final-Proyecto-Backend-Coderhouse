import { Router } from "express";
import chatController from "../controllers/chatController.js";

const chatRouter = new Router();

chatRouter.get('/', chatController.getChat);

chatRouter.get('/:email', chatController.getChatMessagesByEmail);

export default chatRouter;