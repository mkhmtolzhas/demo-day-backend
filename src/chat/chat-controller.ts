import { Request, Response } from "express";
import chatService from "./chat-service";


class ChatController {
    private chatService;

    constructor() {
        this.chatService = chatService;
    }

    async getMessagesByChat(req: Request, res: Response) {
        try {
            const chatId = req.params.chatId;
            const messages = await this.chatService.getMessagesByChat(chatId);
    
            res.status(200).json(messages);
            
        } catch (error) {
            res.status(500).json({message: 'Error getting messages'});
        }
    }

    async getChatById(req: Request, res: Response) {
        try {
            const chatId = req.params.chatId;
            const chat = await this.chatService.getChatById(chatId);
            const messages = await this.chatService.getMessagesByChat(chatId);
    
            res.status(200).json({chat, messages});
            
        } catch (error) {
            res.status(500).json({message: 'Error getting chat'});
        }
    }

    async sendMessage(req: Request, res: Response) {
        try {
            const chat = req.params.chatId;
            const sender = req.user;
            const { content } = req.body;
            console.log(sender);
            await this.chatService.sendMessage(sender, content, chat);
            res.status(200).json({message: 'Message sent'});
            
        } catch (error) {
            res.status(500).json({message: 'Error sending message'});
        }
    }

    async createChat(req: Request, res: Response) {
        try {
            const chat = req.body;
            const newChat = await this.chatService.createChat(chat);
    
            res.status(200).json(newChat);
            
        } catch (error) {
            res.status(500).json({message: 'Error creating chat'}); 
        }
    }

    async deleteMessage(req: Request, res: Response) {
        try {
            const messageId = req.params.messageId;
            const deletedMessage = await this.chatService.deleteMessage(messageId);
    
            res.status(200).json(deletedMessage);
        } catch (error) {
            res.status(500).json({message: 'Error deleting message'});
        }
    }

    async deleteChat(req: Request, res: Response) {
        try {
            const chatId = req.params.chatId;
            const deletedChat = await this.chatService.deleteChat(chatId);

            res.status(200).json(deletedChat);
            
        } catch (error) {
            res.status(500).json({message: 'Error deleting chat'});
        }
    }
}


export default new ChatController();