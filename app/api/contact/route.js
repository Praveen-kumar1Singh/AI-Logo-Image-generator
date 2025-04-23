// app/api/contact/route.js

import { db } from "@/configs/FirebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !message || !email) {
    return NextResponse.json(
      { message: "Name, message, and email are required." },
      { status: 400 }
    );
  }

  try {
    const timestamp = new Date().toISOString();
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json(
        { message: "User not found. Please register first." },
        { status: 404 }
      );
    }

    await addDoc(collection(db, "contacts"), {
      name,
      email,
      message,
      timestamp,
    });

    await updateDoc(userRef, {
      messages: arrayUnion({ name, message, timestamp }),
    });

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error handling contact message:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
