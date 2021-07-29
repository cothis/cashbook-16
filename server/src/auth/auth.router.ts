import 'dotenv-defaults/config';
import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import rs from 'randomstring';
import qs from 'querystring';

const router = Router();
const client_id = process.env.github_client_id;
const client_secret = process.env.github_client_secrets;
const generatedState = rs.generate();

const getUserInfo = async (body: {
  access_token: string;
  token_type: string;
  scope: string;
}) => {
  const { access_token, token_type, scope } = body;
  const options = {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  };
  const response = await fetch('https://api.github.com/user', options);
  const data = await response.json();
  const { login, avatar_url } = data;
  return { login, avatar_url };
};

const sign = (userInfo: { login: string; avatar_url: string }) => {
  const token = jwt.sign(userInfo, 'testkey');
  return token;
};

router.get('/github', (req, res, next) => {
  if (req.session.token) {
    res.redirect('/');
    return;
  }

  const params = {
    client_id,
    redirect_url: 'http://localhost:3000/api/auth/github/login',
    scope: 'user:email',
    state: generatedState,
  };

  const query = qs.stringify(params);

  res.redirect(`https://github.com/login/oauth/authorize?${query}`);
});

router.get('/github/login', async (req: Request, res, next) => {
  const { code, state } = req.query;
  if (generatedState != state) return;

  const options = {
    method: 'post',
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(
    'https://github.com/login/oauth/access_token',
    options
  );
  const body = await response.json();

  const { access_token, token_type, scope } = body;

  console.log('access_token: ', access_token);
  console.log('token_type: ', token_type);
  console.log('scope: ', scope);

  const userInfo = await getUserInfo(body);
  const jwt_token = sign(userInfo);

  console.log(jwt_token);
  req.session.token = jwt_token;
  res.redirect('/');
});

export default router;
