import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, message, email } = req.body;

    if (!name || !message || !email) {
      return res.status(400).json({ message: 'Name, message, and email are required.' });
    }

    try {
      // Save the message to the "contacts" collection
      const contactRef = await db.collection('contacts').add({
        name,
        message,
        email,
        timestamp: new Date().toISOString(),
      });

      // Check if the user exists in the "users" collection
      const userRef = doc(db, 'users', email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // If the user exists, update their document by adding the message to a field
        await updateDoc(userRef, {
          messages: arrayUnion({ name, message, timestamp: new Date().toISOString() }),
        });
      } else {
        // If the user doesn't exist, create a new user document with initial data
        const userData = {
          name,
          email,
          messages: [{ name, message, timestamp: new Date().toISOString() }],
        };
        await setDoc(userRef, userData);
      }

      return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error("Error submitting message:", error);
      return res.status(500).json({ message: 'Error submitting message.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
