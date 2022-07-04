const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-follow-read",
]

const router = express.Router();

router.get('/login', (_, res) => {
  const state = new Array(16).fill().map(() => Math.round(Math.random() * 9)).join('');
  res.redirect('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scopes.join(' '),
      redirect_uri: 'http://localhost:3000/',
      state,
    }));
});

router.get('/callback', async (req, res) => {
  if (!req.query.state) {
    return res.json({error: "state_mismatch"});
  }
  const formBody = new URLSearchParams();
  formBody.append('grant_type', 'authorization_code')
  formBody.append('code', req.query.code)
  formBody.append('redirect_uri', 'http://localhost:3000/')
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: formBody,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const token = await response.json();
    res.json(token)
  } catch(e) {
    res.json({error: e.message})
  }
});

router.get('/refresh', async (req, res) => {
  const { refreshToken } = req.query;
  const formBody = new URLSearchParams();
  formBody.append('grant_type', 'refresh_token');
  formBody.append('refresh_token', refreshToken);
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      body: formBody,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const accessToken = await response.json();
    res.json({access_token: accessToken});
  } catch(e) {
    console.log(e)
    res.json({error: e.message});
  }
});

module.exports = router;