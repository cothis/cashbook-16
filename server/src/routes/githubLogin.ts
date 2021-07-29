import express, { Request, Response } from 'express';
import 'dotenv-defaults/config';
import rs from 'randomstring';
import qs from 'querystring';
import fetch from 'node-fetch';
import { githubAccessToken, githubUser } from '../../DTO/githubLogin';

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
  res.redirect(githubAuthUrl);
});

async function getAccessToken(code: string): Promise<string> {
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
    }),
  });
  const accessTokenJson =
    (await accessTokenResponse.json()) as githubAccessToken;
  return accessTokenJson.access_token;
}

async function getGithubUser(access_token: string): Promise<githubUser> {
  const userApiResponse = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${access_token}`,
    },
  });
  const userApiJson = await userApiResponse.json();
  return userApiJson;
}

githubLoginRouter.get(
  '/callback',
  async (req: Request, res: Response, next) => {
    const { code } = req.query;
    console.log(code);

    const access_token = await getAccessToken(code as string);
    const userData = await getGithubUser(access_token);
    console.log(userData);
    res.redirect('http://localhost:3000/');
  }
);

export default githubLoginRouter;
