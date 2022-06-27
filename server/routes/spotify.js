const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');

const router = express.Router();

router.get('/login', (_, res) => {
  const state = new Array(16).fill().map(() => Math.round(Math.random() * 9)).join('');
  res.redirect('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: 'user-read-private user-read-email',
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

module.exports = router;