import { Router } from "express";
import { adminSignin, adminSignup, traineeSignin, traineeSignup, trainerSignin, trainerSignup } from '../controllers/auth.controller.js';
const router = Router();

router.post("/admin/signin", adminSignin);
router.post("/admin/signup", adminSignup);

router.post("/trainer/signin", trainerSignin);
router.post("/trainer/signup", trainerSignup);

router.post("/trainee/signin", traineeSignin);
router.post("/trainee/signup", traineeSignup);

export default router;