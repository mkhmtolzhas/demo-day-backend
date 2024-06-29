import Message from "./models/Message";
import Chat from "./models/Chat";

class ChatService {
    async getChatById(chatId : string) {
        return await Chat.findById(chatId);
    }
    async getMessagesByChat(chatId : string) {
        return await Message.find({chat: chatId});
    }

    async sendMessage(sender : string, content : string, chat : string) {
        const message = await Message.create({sender, content,  chat});

        await Chat.findByIdAndUpdate(chat, {lastMessage: message._id});
    }

    async createChat(chat) {
        return await Chat.create(chat);
    }

    async deleteMessage(messageId : string) {
        return await Message.findByIdAndDelete(messageId);
    }

    async deleteChat(chatId : string) {
        return await Chat.findByIdAndDelete(chatId);
    }
}

export default new ChatService();