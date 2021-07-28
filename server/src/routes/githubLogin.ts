import express, { Request, Response } from 'express';
import 'dotenv-defaults/config';
import rs from 'randomstring';
import qs from 'querystring';

const GITHUB_CLIENT_ID = process.env.github_client_id;
const user = process.env.github_client_secrets;

const githubLoginRouter = express.Router();

let state;

githubLoginRouter.get('/', (req: Request, res: Response) => {
  state = rs.generate();

  const url = 'https://github.com/login/oauth/authorize?';
  const query = qs.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/api/githublogin/' + 'login2',
    state: state,
    scope: 'user:email',
  });

  const githubAuthUrl = url + query;
  res.json({
    redirect: githubAuthUrl,
  });
  // res.send(githubAuthUrl);
});

githubLoginRouter.get('/login2', (req: Request, res: Response) => {
  const { code, state } = req.query;
  console.log(code, state);

  res.redirect('http://localhost:3000/');
});

export default githubLoginRouter;
