const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const crypto = require('crypto');

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

  const getCounterValue = async () => {
    const range = 'Ticket Settings!D2';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return parseInt(response.data.values[0][0], 10);
  };

  const updateCounterValue = async (newCounter) => {
    const range = 'Ticket Settings!D2';
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[newCounter]],
      },
    });
  };
  const formatTicketNumber = (counter) => {
    return `TF-${counter.toString().padStart(3, '0')}`;
  };

  const formDataArray = req.body;
  
  let counter = await getCounterValue();

  const values = formDataArray.map(data => {
    const {
      email, name, phoneNo, workStudy, findUs, workStudyCustom, findUsCustom,
      department, semester, ticketType, paymentType, teamMemberName, upiTransactionId, paymentScreenshot,
    } = data;

    const finalWorkStudy = workStudy === 'other' ? workStudyCustom : workStudy;
    const finalFindUs = findUs === 'other' ? findUsCustom : findUs;
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const verification = "pending";
    const status = "pending";
    const input = name.toUpperCase() + email.toUpperCase();
    const ticketId = crypto.createHash('sha256').update(input).digest('hex');
    const ticketNumber = formatTicketNumber(counter+1);
    
    counter += 1;

    return [
      timestamp, email, name, phoneNo, finalWorkStudy, finalFindUs, department, semester, ticketType,
      paymentType, teamMemberName, upiTransactionId, paymentScreenshot, verification, status, ticketNumber, ticketId,
    ];
  });

  await updateCounterValue(counter);

  const request = {
    spreadsheetId,
    range: 'Ticket Sheet!A1',
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
