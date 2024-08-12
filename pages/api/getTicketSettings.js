import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const dataFilePath = path.join(process.cwd(), 'data', 'ticketSettings.json');

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Error reading file' });
      return;
    }
    res.status(200).json(JSON.parse(data));
  });
}
