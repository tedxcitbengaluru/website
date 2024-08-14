import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export default async function handler(req, res) {
  const auth = new GoogleAuth({
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
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
  const range = 'Ticket Settings!A2:D2'; 

  if (req.method === 'GET') {
    try {
      const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
      const values = response.data.values;

      if (values.length) {
        const [showEarlyBird, toggleTicketing, toggleTicketingComplete, counter] = values[0];
        res.status(200).json({
          showEarlyBird: showEarlyBird === 'TRUE',
          toggleTicketing: toggleTicketing === 'TRUE',
          toggleTicketingComplete: toggleTicketingComplete === 'TRUE',
          counter: parseInt(counter, 10) || 0,
        });
      } else {
        res.status(404).send('No data found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error reading data from Google Sheets');
    }
  } else if (req.method === 'POST') {
    try {
      const { counter } = req.body;

      const counterRange = 'Ticket Settings!D2:D2'; 

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: counterRange,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[counter]],
        },
      });

      res.status(200).send('Values updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating data in Google Sheets');
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
