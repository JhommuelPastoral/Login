import express from "express";
import cors from "cors";
import { test, register, login, getProfile} from "../controllers/authController.js";
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();
router.use(
  cors({
    credentials:true,
    origin: process.env.ORIGIN
  })
);

router.get('/', test);

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getProfile);

export default router;