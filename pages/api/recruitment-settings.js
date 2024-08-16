import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export default async function handler(req, res) {

  const referer = req.headers.referer;

    if (!referer || !referer.endsWith('/join')) {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    }
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
  const range = 'Recruitment Settings!A2'; 

  if (req.method === 'GET') {
    try {
      const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
      const values = response.data.values;

      if (values.length) {
        const [isRecruitmentEnabled] = values[0];
        res.status(200).json({
          isRecruitmentEnabled: isRecruitmentEnabled === 'TRUE',
        });
      } else {
        res.status(404).send('No data found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error reading data from Google Sheets');
    }
  } 
}
