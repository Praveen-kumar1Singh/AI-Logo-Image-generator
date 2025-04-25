import axios from 'axios';
import { db } from "@/configs/FirebaseConfig";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import cloudinary from "@/lib/cloudinaryConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, email, title, desc } = await req.json();

  try {
    console.log("📨 Request received:", { prompt, email, title, desc });

    // Call DeepInfra to generate the logo
    const response = await axios.post(
      'https://api.deepinfra.com/v1/openai/images/generations',
      {
        prompt: prompt,
        size: '512x512',
        n: 1,
        model: 'stabilityai/sdxl-turbo'
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPINFRA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 🔍 Inspect the full response for debugging
    const imageData = response.data?.data?.[0];
    console.log("🔍 DeepInfra image response:", imageData);

    // ✅ Extract the correct image URL or base64
    const imageUrl = imageData?.url || imageData?.image_url;
    const base64Data = imageData?.b64_json;

    let base64ImageWithMime;

    if (imageUrl) {
      // If URL is available, fetch and convert it to base64
      const imageBuffer = await fetch(imageUrl).then(res => res.arrayBuffer());
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    } else if (base64Data) {
      base64ImageWithMime = `data:image/png;base64,${base64Data}`;
    } else {
      throw new Error("❌ No image data (URL or base64) returned by DeepInfra API.");
    }

    // ☁️ Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64ImageWithMime, {
      folder: "logos",
      resource_type: "auto"
    });

    const uploadedImageUrl = uploadResult.secure_url;
    console.log("✅ Uploaded to Cloudinary:", uploadedImageUrl);

    // 🧠 Prepare metadata to store in Firestore
    const logoData = {
      image: uploadedImageUrl,
      title,
      desc,
      prompt,
      id: Date.now(),
    };

    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, { logos: [logoData] });
    } else {
      await updateDoc(userDocRef, {
        logos: arrayUnion(logoData),
      });
    }

    // 🎉 Send back the final URL
    return NextResponse.json({ image: uploadedImageUrl });

  } catch (err) {
    console.error("❌ Error during logo generation:", err?.response?.data || err.message);
    return NextResponse.json({ error: "Failed to generate logo" }, { status: 500 });
  }
}
