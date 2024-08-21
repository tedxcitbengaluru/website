const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

export default async function getSheetData(req, res) {
  try {
    // Initialize Google Sheets API with service account credentials
    const auth = new GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_DATA_SHEET_ID; 

    // Define ranges for each sheet
    const ranges = [
      'About!A:F',
      'Events!A:E',
      'Categories!A:B',
      'Sponsors!A:B',
      'Circles!A:D',
      'Team!A:E',
      'Speakers & Performers!A:F'
    ];

    // Fetch data from each range
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    });

    // Extract the data from each range
    const about = response.data.valueRanges[0].values || [];
    const events = response.data.valueRanges[1].values || [];
    const categories = response.data.valueRanges[2].values || [];
    const sponsors = response.data.valueRanges[3].values || [];
    const circles = response.data.valueRanges[4].values || [];
    const team = response.data.valueRanges[5].values || [];
    const speakersAndPerformers = response.data.valueRanges[6].values || [];
    const home = events.length > 0 ? events[events.length - 1] : [];

    const data = {
      about,
      events,
      categories,
      sponsors,
      circles,
      team,
      speakersAndPerformers,
      home, 
    };

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).send('Error fetching data from Google Sheets');
  }
}
