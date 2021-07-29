import 'dotenv-defaults/config';
import { Router } from 'express';
import fetch from 'node-fetch';
import rs from 'randomstring';
import qs from 'querystring';

const router = Router();
const client_id = process.env.github_client_id;
const client_secret = process.env.github_client_secrets;
const generatedState = rs.generate();

router.get('/github', (req, res, next) => {
  const params = {
    client_id,
    redirect_url: 'http://localhost:3000/api/auth/github/login',
    scope: 'user:email',
    state: generatedState,
  };

  const query = qs.stringify(params);

  res.redirect(`https://github.com/login/oauth/authorize?${query}`);
});

router.get('/github/login', async (req, res, next) => {
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
  res.redirect('/');
});

export default router;
