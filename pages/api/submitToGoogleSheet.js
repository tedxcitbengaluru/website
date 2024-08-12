const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

export default async function submitToGoogleSheet(req, res) {
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
  const range = 'Sheet1!A1';

  const {
    email, fullname, phoneno, workStudy, findUs, workStudyCustom, findUsCustom,
    department, semester, ticketType, paymentType, teamMemberName, upiTransactionId, paymentScreenshot,
  } = req.body;

  const finalWorkStudy = workStudy === 'other' ? workStudyCustom : workStudy;
  const finalFindUs = findUs === 'other' ? findUsCustom : findUs;

  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [
        [
          email, fullname, phoneno, finalWorkStudy, finalFindUs, department, semester,ticketType,
          paymentType, teamMemberName, upiTransactionId, paymentScreenshot,
        ],
      ],
    },
  };

  try {
    await sheets.spreadsheets.values.append(request);
    res.status(200).send('Success');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting form data to Google Sheets');
  }
}
