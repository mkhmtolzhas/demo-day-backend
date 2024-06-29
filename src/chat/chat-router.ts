import { Router } from "express";
import chatController from "./chat-controller";
import authMiddleware from "../middlewares/auth-middleware";

const chatRouter = Router();

chatRouter.get("/:chatId", authMiddleware, chatController.getChatById.bind(chatController));

chatRouter.get("/:chatId/messages", authMiddleware, chatController.getMessagesByChat.bind(chatController));

chatRouter.post("/:chatId/send", authMiddleware, chatController.sendMessage.bind(chatController));

chatRouter.post("/create", authMiddleware, chatController.createChat.bind(chatController));

chatRouter.delete("/message/:messageId", authMiddleware, chatController.deleteMessage.bind(chatController));

chatRouter.delete("/:chatId", authMiddleware, chatController.deleteChat.bind(chatController));

export default chatRouter;