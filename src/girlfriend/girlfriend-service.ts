import Girlfriend from "./models/Girlfriend";


class GirlfriendService {
    async getGirlfriendById(girlfriendId : string) {
        return await Girlfriend.findById(girlfriendId);
    }

    async createGirlfriend(girlfriend) {
        return await Girlfriend.create(girlfriend);
    }

    async deleteGirlfriend(girlfriendId : string) {
        return await Girlfriend.findByIdAndDelete(girlfriendId);
    }

    async getGirlfriends() {
        return await Girlfriend.find();
    }

    async updateGirlfriend(girlfriendId : string, girlfriend) {
        return await Girlfriend.findByIdAndUpdate(girlfriendId, girlfriend);
    }
}

export default new GirlfriendService();