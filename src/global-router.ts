import { Router } from 'express';
import authRouter from './auth/auth-router';
import chatRouter from './chat/chat-router';
import DIDRouter from './d-id/d-id-router';
import girlfriendRouter from './girlfriend/girlfriend-router';

const globalRouter = Router();


globalRouter.use('/auth' ,authRouter);
globalRouter.use("/chat", chatRouter);
globalRouter.use("/d-id", DIDRouter);
globalRouter.use("/girlfriend", girlfriendRouter);


export default globalRouter;
