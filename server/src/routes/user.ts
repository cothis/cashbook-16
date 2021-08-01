import express, { Request, Response } from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();

router.get('/', UserController.login);
router.get('/test', UserController.test);

export default router;
