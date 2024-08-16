const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const { Readable } = require('stream');

export default async function uploadToGoogleDrive(req, res) {
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
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });
  const folderid = process.env.GOOGLE_DRIVE_FOLDER_ID;
  try {
    const { file, fileName, mimeType } = req.body;

    const buffer = Buffer.from(file, 'base64');
    const readableStream = Readable.from(buffer);

    const fileMetadata = {
      name: fileName,
      mimeType: mimeType,
      parents: [folderid],
    };
    const media = {
      mimeType: mimeType,
      body: readableStream,
    };

    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    const fileLink = driveResponse.data.webViewLink;
    res.status(200).json({ link: fileLink });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file to Google Drive');
  }
}
