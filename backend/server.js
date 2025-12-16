
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/submit', (req, res) => {
  try {
    const { cardNumber, expiryDate } = req.body;
    if (!/^\d{13,19}$/.test(cardNumber)) {
      return res.status(400).json({ error: 'Invalid card number' });
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return res.status(400).json({ error: 'Invalid expiry date' });
    }
    const token = 'tok_' + Math.random().toString(36).slice(2);
    res.json({ token, last4: cardNumber.slice(-4) });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
