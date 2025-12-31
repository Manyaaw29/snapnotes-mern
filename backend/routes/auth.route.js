import express from 'express';

const router = express.Router();
router.post('/login', (req, res) => {
  // Login logic here
  res.send('Login route');
})

export default router;
