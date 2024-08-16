const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const crypto = require('crypto');

export default async function submitTicketForm(req, res) {
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

  const spreadsheetIds = [
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID_1, 
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID_2,
  ];

  const range = 'Ticket Sheet!A1';

  const formDataArray = req.body;

  const generateTicketNumber = (ticketType) => {
    if (ticketType === "Early Bird") {
      return `EBT-${Math.floor(Math.random() * 9000) + 1000}`;
    } else if (ticketType === "Group of 3") {
      return `G3T-${Math.floor(Math.random() * 9000) + 1000}`;
    } else if (ticketType === "Group of 5") {
      return `G5T-${Math.floor(Math.random() * 9000) + 1000}`;
    } else {
      return `ST-${Math.floor(Math.random() * 9000) + 1000}`;
    }
  };

  // Generate ticket number for each entry
  const values = formDataArray.map(data => {
    const {
      email, name, phoneNo, workStudy, findUs, workStudyCustom, findUsCustom,
      department, semester, ticketType, paymentType, teamMemberName, upiTransactionId, paymentScreenshot,
    } = data;

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const verification = "Pending";
    const input = name.toUpperCase() + email.toUpperCase();
    const ticketId = crypto.createHash('sha256').update(input).digest('hex');
    const ticketNumber = generateTicketNumber(ticketType);

    const finalWorkStudy = workStudy === 'other' ? workStudyCustom : workStudy;
    const finalFindUs = findUs === 'other' ? findUsCustom : findUs;

    return [
      timestamp, email, name, phoneNo, finalWorkStudy, finalFindUs, department, semester, ticketType,
      paymentType, teamMemberName, upiTransactionId, paymentScreenshot, verification, ticketNumber, ticketId
    ];
  });

  const requests = spreadsheetIds.map(spreadsheetId => ({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values,
    },
  }));

  try {
    // Execute both requests in parallel
    await Promise.all(requests.map(request => {
      return sheets.spreadsheets.values.append(request);
    }));
    res.status(200).send('Success');
  } catch (err) {
    console.error('Error:', err); 
    res.status(500).send('Error submitting form data to Google Sheets');
  }
}
