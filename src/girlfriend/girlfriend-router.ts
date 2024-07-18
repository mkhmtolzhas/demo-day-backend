import { Router } from "express";
import girlfriendController from "./girlfriend-controller";

const girlfriendRouter = Router();

girlfriendRouter.get('/:girlfriendId', girlfriendController.getGirlfriendById.bind(girlfriendController));

girlfriendRouter.post('/', girlfriendController.createGirlfriend.bind(girlfriendController));

girlfriendRouter.delete('/:girlfriendId', girlfriendController.deleteGirlfriend.bind(girlfriendController));

girlfriendRouter.get('/', girlfriendController.getGirlfriends.bind(girlfriendController));

girlfriendRouter.put('/:girlfriendId', girlfriendController.updateGirlfriend.bind(girlfriendController));

girlfriendRouter.get('/amount/:amount', girlfriendController.getGirlfriendByAmount.bind(girlfriendController));

export default girlfriendRouter;