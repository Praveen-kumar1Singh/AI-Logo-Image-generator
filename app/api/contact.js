// pages/api/contact.js
import { db } from "@/configs/FirebaseConfig";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required.' });
    }

    try {
      // Save data to Firebase Firestore
      const docRef = await db.collection('contacts').add({
        name,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      return res.status(500).json({ message: 'Error submitting message.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
