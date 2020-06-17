import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const router = express.Router();

app.use(cors());

router.get('/file/:url', (req, res) => {
  const { url } = req.params;
  res.sendFile(url);
});

app.use('/', router);

app.listen(9192);
