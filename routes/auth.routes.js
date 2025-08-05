import { Router } from "express";
import { validateSchema } from '../middlewares/validate.middleware.js';
import { adminSignin, adminSignup, traineeSignin, traineeSignup, trainerSignin, trainerSignup } from '../controllers/auth.controller.js';
import { traineeSignupSchema } from '../validators/trainee.validator.js';
const router = Router();

router.post("/admin/signin", adminSignin);
router.post("/admin/signup", adminSignup);

router.post("/trainer/signin", trainerSignin);
router.post("/trainer/signup", trainerSignup);

router.post("/trainee/signin", traineeSignin);
router.post("/trainee/signup", validateSchema(traineeSignupSchema), traineeSignup);

export default router;