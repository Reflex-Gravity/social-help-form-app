const { Router } = require('express');

const router = Router();

router.use('/health', async (req, res) => {
  return res.status(200).send('OK');
});

module.exports = router;
