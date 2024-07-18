import girlfriendService from "./girlfriend-service";
import { Request, Response } from "express";
import openaiSystemPromptWriter from "../openai/openai-system-prompt-writer";

class GirlfriendController {
    private girlfriendService;

    constructor() {
        this.girlfriendService = girlfriendService;
    }

    async getGirlfriendById(req: Request, res: Response) {
        try {
            const girlfriendId = req.params.girlfriendId;
            const girlfriend = await this.girlfriendService.getGirlfriendById(girlfriendId);

            res.status(200).json(girlfriend);
        } catch (error) {
            res.status(500).json({message: 'Error getting girlfriend'});
        }
    }

    async createGirlfriend(req: Request, res: Response) {
        try {
            const { name, image, description } = req.body;

            const userPrompt = `Create a girlfriend named ${name} with the following description: ${description}`;
            console.log(userPrompt);
            const systemPromptWriter = openaiSystemPromptWriter;

            const response = await systemPromptWriter.create(userPrompt);

            const girlfriend = {
                name,
                image,
                description : response,
            };

            const newGirlfriend = await this.girlfriendService.createGirlfriend(girlfriend);

            res.status(200).json(newGirlfriend);
        } catch (error) {
            res.status(500).json({message: 'Error creating girlfriend'});
        }
    }

    async deleteGirlfriend(req: Request, res: Response) {
        try {
            const girlfriendId = req.params.girlfriendId;
            await this.girlfriendService.deleteGirlfriend(girlfriendId);

            res.status(200).json({message: 'Girlfriend deleted'});
        } catch (error) {
            res.status(500).json({message: 'Error deleting girlfriend'});
        }
    }

    async getGirlfriends(req: Request, res: Response) {
        try {
            const girlfriends = await this.girlfriendService.getGirlfriends();

            res.status(200).json(girlfriends);
        } catch (error) {
            res.status(500).json({message: 'Error getting girlfriends'});
        }
    }

    async updateGirlfriend(req: Request, res: Response) {
        try {
            const girlfriendId = req.params.girlfriendId;
            const girlfriend = req.body;
            await this.girlfriendService.updateGirlfriend(girlfriendId, girlfriend);
            
            res.status(200).json({message: 'Girlfriend updated'});
        } catch (error) {
            res.status(500).json({message: 'Error updating girlfriend'});
        }
    }

    async getGirlfriendByAmount(req: Request, res: Response) {
        try {
            const amount = parseInt(req.params.amount);
            const girlfriends = await this.girlfriendService.getGirlfriendByAmount(amount);

            res.status(200).json(girlfriends);
        } catch (error) {
            res.status(500).json({message: 'Error getting girlfriends'});
        }
    }
}

export default new GirlfriendController();