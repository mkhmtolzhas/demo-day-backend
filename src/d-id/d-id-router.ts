import { Router } from "express";
import dIDController from "./d-id-controller";

const DIDRouter = Router();

DIDRouter.post('/generate-video', dIDController.generateVideo);
// DIDRouter.get('/get-video/:id', dIDController.getVideo);

export default DIDRouter;