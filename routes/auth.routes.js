import { Router } from "express";
import { validate } from '../middlewares/validate.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';
import { adminSignin, adminSignup, traineeSignin, traineeSignup, trainerSignin, trainerSignup, refreshToken } from '../controllers/auth.controller.js';
import { traineeSignupSchema, traineeSigninSchema } from '../validators/trainee.validator.js';
import { trainerSigninSchema, trainerSignupSchema } from '../validators/trainer.validator.js';
import { adminSigninSchema, adminSignupSchema } from '../validators/admin.validator.js';

const router = Router();

router.post("/admin/signin", validate(adminSigninSchema), adminSignin);
router.post("/admin/signup", validate(adminSignupSchema), isAdmin, adminSignup);

router.post("/trainer/signin", validate(trainerSigninSchema), trainerSignin);
router.post("/trainer/signup", validate(trainerSignupSchema), trainerSignup);

router.post("/trainee/signin", validate(traineeSigninSchema), traineeSignin);
router.post("/trainee/signup", validate(traineeSignupSchema), traineeSignup);

router.post("/refresh-token", refreshToken);

export default router;