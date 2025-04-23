"use client";
import React, { useContext, useEffect, useState } from "react";
import LookUp from "../_data/LookUp";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { DownloadIcon, LayoutDashboard, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserDetailContext } from "../_context/UserDetailsContext";

const GenerateLogo = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(null);

  // Fetch the form data from local storage if the user is logged in
  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        const parsedFormData = JSON.parse(storage);
        setFormData(parsedFormData);
        console.log("Form data from localStorage:", parsedFormData);
      }
    }
  }, [userDetail]);

  // Generate logo when formData.title is available
  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  const GenerateAILogo = async () => {
    try {
      setLoading(true);
      const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData.title)
        .replace("{logoDesc}", formData.desc)
        .replace("{logoColor}", formData.palette)
        .replace("{logoIdea}", formData.idea)
        .replace("{logoDesign}", formData.design.title)
        .replace("{logoPrompt}", formData.design.prompt);

      console.log("Generated Prompt:", PROMPT);

      // Make the API call to generate the logo
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userDetail?.email,
        title: formData?.title || "",
        desc: formData?.desc || "",
      });

      console.log("AI result:", result.data);

      if (result.data?.image) {
        setLogoImage(result.data.image);
      } else {
        console.error("No image data received from AI API.");
      }
    } catch (error) {
      console.error("Error generating logo:", error);
      alert("There was an error generating your logo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDownload = () => {
    if (logoImage) {
      const imageWindow = window.open();
      imageWindow.document.write(`<img src="${logoImage}" alt="Generated Logo" />`);
    }
  };

  return (
    <div className="mt-16 flex min-h-screen flex-col items-center justify-center">
      <h2 className="font-bold text-3xl text-blue-600">{LookUp.LoadingWaitTitle}</h2>

      {loading && (
        <div className="flex flex-col items-center mt-2">
          <p className="text-xl text-gray-500">{LookUp.LoadingWaitDesc}</p>
          <LoaderIcon className="animate-spin" />
          <Image
            src={"/loading.gif"}
            alt="loading"
            width={200}
            height={200}
            className="mt-6"
          />
          <h2 className="mt-2 font-medium text-2xl text-gray-500">Do Not Refresh!</h2>
        </div>
      )}

      {logoImage && !loading && (
        <div className="mt-5">
          <img
            src={logoImage}
            alt="logo"
            width={300}
            height={300}
            className="rounded-xl"
          />
          <div className="mt-4 flex items-center gap-5">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={onDownload}>
              <DownloadIcon /> Download
            </Button>
            <Link href={"/dashboard"}>
              <Button variant="outline">
                <LayoutDashboard /> Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateLogo;
