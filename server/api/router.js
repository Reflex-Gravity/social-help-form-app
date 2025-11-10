const { Router } = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

router.use('/health', async (req, res) => {
  return res.status(200).send('OK');
});

router.post('/form-submit', async (req, res) => {
  return res.status(200).json({ status: 'success', message: 'form submitted' });
});

router.post('/generate', async (req, res) => {
  try {
    const userMessage = req.body.prompt;
    const lang = req.body.lang;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: `I am unemployed with no income. Help me describe my financial hardship.
          Use language: ${lang}
          `,
        },
        { role: 'user', content: userMessage },
      ],
    });

    if (!completion.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    res.status(200).json({ status: 'success', message: completion.choices[0].message.content });
    return;
  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(500).json({ error: 'API authentication failed' });
    }

    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded, try again later' });
    }

    if (error.status === 500) {
      return res.status(502).json({ error: 'OpenAI service unavailable' });
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Request timeout' });
    }

    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;
