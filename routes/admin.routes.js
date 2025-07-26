import { Router } from "express";
import { sayHello } from "../controllers/admin.controller.js";
const router = Router();

router.get("/", sayHello);

// Training Program Management

// Create training programs and modules

export default router;
