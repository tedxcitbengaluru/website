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
  const range = 'Ticket Sheet!A1';

  const formDataArray = req.body; 

  const formatTimestamp = (date) => {
    const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

    const day = ('0' + istDate.getDate()).slice(-2);
    const month = ('0' + (istDate.getMonth() + 1)).slice(-2);
    const year = istDate.getFullYear();
    const hours = ('0' + istDate.getHours()).slice(-2);
    const minutes = ('0' + istDate.getMinutes()).slice(-2);
    const seconds = ('0' + istDate.getSeconds()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };
  const values = formDataArray.map(data => {
    const {
      email, name, phoneNo, workStudy, findUs, workStudyCustom, findUsCustom,
      department, semester, ticketType, paymentType, teamMemberName, upiTransactionId, paymentScreenshot,
    } = data;

    const finalWorkStudy = workStudy === 'other' ? workStudyCustom : workStudy;
    const finalFindUs = findUs === 'other' ? findUsCustom : findUs;
    const timestamp = formatTimestamp(new Date());
    const verification = "pending";
    const status = "pending";


    return [
      timestamp ,email, name, phoneNo, finalWorkStudy, finalFindUs, department, semester, ticketType,
      paymentType, teamMemberName, upiTransactionId, paymentScreenshot, verification, status,
    ];
  });

  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values,
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
