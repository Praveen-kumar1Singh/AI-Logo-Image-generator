import { fal } from "@fal-ai/client";
import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/FirebaseConfig";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import cloudinary from "@/lib/cloudinaryConfig"; // Import cloudinary configuration
import { NextResponse } from "next/server";

// Set Fal API Key
fal.config({ credentials: process.env.FAL_KEY });

export async function POST(req) {
  const { prompt, email, title, desc } = await req.json();

  try {
    console.log("Received request data:", { prompt, email, title, desc });

    // Step 1: Get refined prompt from Gemini (AILogoPrompt)
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;

    // Validate AIPrompt
    if (!AIPrompt || typeof AIPrompt !== 'string') {
      throw new Error("Invalid prompt returned from AI prompt service");
    }

    console.log("AIPrompt:", AIPrompt);

    // Step 2: Call Fal.AI using their SDK to generate the logo
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
      input: {
        prompt: AIPrompt,
        output_format: "png", // Ensuring image format is correct
        aspect_ratio: "1:1",  // Standard aspect ratio for logos
        num_images: 1,        // Only one image needed
        enable_safety_checker: true, // Ensure safety check is on
        sync_mode: true,      // Synchronous mode
      },
      logs: true,            // Logging to debug Fal.AI progress
      onQueueUpdate: (update) => {
        console.log("Fal.AI update:", update.status);
      },
    });

    // Ensure result contains the image URL
    const imageUrl = result?.data?.images?.[0]?.url;
    if (!imageUrl) throw new Error("No image URL returned by Fal.AI");

    console.log("Generated image URL:", imageUrl);

    // Step 3: Convert image to base64
    const imageBuffer = await fetch(imageUrl).then(res => res.arrayBuffer());
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

    // Step 4: Upload the base64 image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64ImageWithMime, {
      folder: "logos",  // Store images in a specific folder in Cloudinary
      resource_type: "auto",  // Automatically detect the file type (png, jpeg, etc.)
    });

    const uploadedImageUrl = uploadResult.secure_url; // Get the Cloudinary URL

    // Now save this URL to Firestore instead of the full base64 string
    const logoData = {
      image: uploadedImageUrl,  // Store the URL of the image in Firestore
      title: title,
      desc: desc,
      prompt: AIPrompt,
      id: Date.now(),
    };

    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.log("Creating new user document");
      await setDoc(userDocRef, { logos: [logoData] });
    } else {
      console.log("Updating existing user document with new logo");
      await updateDoc(userDocRef, {
        logos: arrayUnion(logoData),  // Adding logoData to the logos array
      });
    }

    // Return the generated logo URL in the response
    return NextResponse.json({ image: uploadedImageUrl });

  } catch (err) {
    // Handle errors and log them
    console.error("❌ Fal API error:", err?.response?.data || err.message);
    return NextResponse.json({ error: "Failed to generate logo" }, { status: 500 });
  }
}
