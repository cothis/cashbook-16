import express, { Request, Response } from 'express';
import 'dotenv-defaults/config';
import rs from 'randomstring';
import qs from 'querystring';
import fetch from 'node-fetch';

const GITHUB_CLIENT_ID = process.env.github_client_id;
const GITHUB_CLIENT_SECRETS = process.env.github_client_secrets;

const githubLoginRouter = express.Router();

let state;

githubLoginRouter.get('/', (req: Request, res: Response) => {
  state = rs.generate();

  const url = 'https://github.com/login/oauth/authorize?';
  const query = qs.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/api/githublogin/callback',
    state: state,
    scope: 'user:email',
  });

  const githubAuthUrl = url + query;
  res.json({
    redirect: githubAuthUrl,
  });
  // res.send(githubAuthUrl);
});

githubLoginRouter.get(
  '/callback',
  async (req: Request, res: Response, next) => {
    const { code, state } = req.query;
    console.log(code, state);

    const tokenURL = 'https://github.com/login/oauth/access_token';
    const accessTokenResponse = await fetch(tokenURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRETS,
        code: code as string,
        redirect_uri: 'http://localhost:3000/',
        // state: state as string,
      }),
    });
    const accessTokenJson = await accessTokenResponse.json();
    console.log(accessTokenJson);
    /**
     * {
     *   access_token: 'secrete_token_here',
     *   token_type: 'bearer',
     *   scope: 'user:email'
     * }
     */
    const userApiResponse = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `token ${accessTokenJson.access_token}`,
      },
    });
    const userApiJson = await userApiResponse.json();
    console.log(userApiJson);

    res.redirect('http://localhost:3000/');
  }
);

export default githubLoginRouter;
