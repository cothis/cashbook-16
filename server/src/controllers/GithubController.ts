import { NextFunction, Request, Response } from 'express';
import 'dotenv-defaults/config';
import rs from 'randomstring';
import qs from 'querystring';
import fetch from 'node-fetch';
import { githubAccessToken, githubUser } from '../DTO/githubLogin';

const GITHUB_CLIENT_ID = process.env.github_client_id;
const GITHUB_CLIENT_SECRETS = process.env.github_client_secrets;
const SELF_URL = process.env.self_url;

class GithubController {
  state: string;

  constructor() {}

  githubLogin(req: Request, res: Response, next: NextFunction) {
    this.state = rs.generate();

    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: `${SELF_URL}/api/githublogin/callback`,
      state: this.state,
      scope: 'user:email',
    });

    const githubAuthUrl = url + query;
    res.redirect(githubAuthUrl);
  }

  async callback(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      const access_token = await this.getAccessToken(code as string);
      const userData = await this.getGithubUser(access_token);

      req.session.githubId = userData.login;
      req.session.avatar_url = userData.avatar_url;
      res.redirect(`${SELF_URL}/`);
    } catch {
      res.redirect(`${SELF_URL}/error`);
    }
  }

  private async getAccessToken(code: string): Promise<string> {
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
        redirect_uri: `${SELF_URL}/`,
      }),
    });
    const accessTokenJson: githubAccessToken = await accessTokenResponse.json();
    return accessTokenJson.access_token;
  }

  private async getGithubUser(access_token: string): Promise<githubUser> {
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
}

export default new GithubController();
