import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export default async function handler(req, res) {
  const auth = new GoogleAuth({
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure new lines are correctly handled
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID_1;
  const range = 'Ticket Sheet!P2:P'; // Get data from P2 to the end of column P

  if (req.method === 'GET') {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const values = response.data.values || [];
      const hashes = values.flat().filter(cell => cell.trim() !== ''); // Filter out empty cells

      res.status(200).json({ hashes });
    } catch (error) {
      console.error('Error fetching hashes:', error);
      res.status(500).json({ message: 'Error fetching hashes.' });
    }
  } else if (req.method === 'POST') {
    const { qrCodeData } = req.body;

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const values = response.data.values || [];
      const hashes = values.flat().filter(cell => cell.trim() !== '');

      const index = hashes.indexOf(qrCodeData);
      if (index !== -1) {
        const rowIndex = index + 2; // +2 because the range starts from P2
        const updateRange = `Ticket Sheet!Q${rowIndex}`;

        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: updateRange,
          valueInputOption: 'RAW',
          requestBody: {
            values: [['scanned']],
          },
        });

        res.status(200).json({ message: 'QR code found and updated.' });
      } else {
        res.status(404).json({ message: 'QR code not found.' });
      }
    } catch (error) {
      console.error('Error updating the sheet:', error);
      res.status(500).json({ message: 'Error updating the sheet.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
