import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body;
      const buffer = Buffer.from(file.split(',')[1], 'base64');
      const fs = require('fs');

      const imagePath = `uploads/${Date.now()}-${req.body.file.originalname}`;
      fs.writeFileSync(`public/${imagePath}`, buffer);

      res.status(200).json({ message: 'Profile picture uploaded successfully', imagePath });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload the profile picture' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
