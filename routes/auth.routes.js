import { Router } from "express";
import { validateSchema } from '../middlewares/validate.middleware.js';
import { adminSignin, adminSignup, traineeSignin, traineeSignup, trainerSignin, trainerSignup, refreshToken } from '../controllers/auth.controller.js';
import { traineeSignupSchema, traineeSigninSchema } from '../validators/trainee.validator.js';
import { trainerSigninSchema, trainerSignupSchema } from '../validators/trainer.validator.js';

const router = Router();

router.post("/admin/signin", adminSignin);
router.post("/admin/signup", adminSignup);

router.post("/trainer/signin", validateSchema(trainerSigninSchema), trainerSignin);
router.post("/trainer/signup", validateSchema(trainerSignupSchema), trainerSignup);

router.post("/trainee/signin", validateSchema(traineeSigninSchema), traineeSignin);
router.post("/trainee/signup", validateSchema(traineeSignupSchema), traineeSignup);

router.post("/refresh-token", refreshToken);

export default router;