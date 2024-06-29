import { Router } from 'express';
import authRouter from './auth/auth-router';
import chatRouter from './chat/chat-router';

const globalRouter = Router();


globalRouter.use('/auth' ,authRouter);
globalRouter.use("/chat", chatRouter);


export default globalRouter;
