/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { KanjiCharacter } from '@jp-wotd/shared/wotd/types';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to wotd-api!' });
});

app.get('/api/kanji', (req, res) => {
  const kanji : KanjiCharacter = {
    kanji: '日',
    onyomi: ['ニチ', 'ジツ'],
    kunyomi: ['ひ', '-び', '-か'],
    meaning: ['day', 'sun', 'Japan', 'counter for days'],
    strokeCount: 4,
    jlptLevel: 4,
    unicode: '65e5',
  };
  res.send(kanji);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
