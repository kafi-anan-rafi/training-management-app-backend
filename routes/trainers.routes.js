import { Router } from "express";
import {sayHello} from '../controllers/trainers.controller.js'
const router = Router();

router.get("/", sayHello);

export default router;