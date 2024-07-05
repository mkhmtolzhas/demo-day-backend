import { Router } from 'express';
import authRouter from './auth/auth-router';
import chatRouter from './chat/chat-router';
import DIDRouter from './d-id/d-id-router';

const globalRouter = Router();


globalRouter.use('/auth' ,authRouter);
globalRouter.use("/chat", chatRouter);
globalRouter.use("/d-id", DIDRouter);


export default globalRouter;
