const express = require('express');
const router = express.Router();

router.get('/uuid', async (req, res) => {
  console.log('Request received at /api/liff/uuid');
  const token = req.headers['authorization']?.split('Bearer ')[1];
  console.log('Extracted token:', token);
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const profile = await fetch('https://api.line.me/v2/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json());
    console.log('LINE API response:', profile)
    if (profile.error) return res.status(401).json({ error: profile.error });
    res.json({ line_uuid: profile.userId });
  } catch (err) {
    console.error('Error fetching LINE profile:', err);
    res.status(500).json({ error: 'Failed to fetch UUID' });
  }
});

module.exports = router;