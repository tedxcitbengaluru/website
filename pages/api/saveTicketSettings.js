import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newSettings = req.body;
    const dataFilePath = path.join(process.cwd(), 'data', 'ticketSettings.json');

    fs.writeFile(dataFilePath, JSON.stringify(newSettings, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Error writing file' });
        return;
      }
      res.status(200).json({ message: 'Settings saved successfully!' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
