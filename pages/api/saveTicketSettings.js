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

  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const range = 'Sheet2!A2';

  const { showEarlyBird, toggleTicketing, toggleTicketingComplete } = req.body;

  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: {
      values: [
        [showEarlyBird, toggleTicketing, toggleTicketingComplete],
      ],
    },
  };

  try {
    await sheets.spreadsheets.values.update(request);
    res.status(200).send('Success');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error writing data to Google Sheets');
  }
}
