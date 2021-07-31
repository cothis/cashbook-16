import express from 'express';
import githubController from '../controllers/GithubController';

const router = express.Router();

router.get('/', githubController.githubLogin);
router.get('/callback', githubController.callback);

export default router;
