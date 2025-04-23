// app/terms/page.js
import React from 'react';

export const metadata = {
  title: 'Terms and Conditions | GenLogo',
  description: 'Terms and conditions for using the GenLogo AI Logo Generator.',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-gray-700 mb-4">Last updated: April 23, 2025</p>
      <p className="text-gray-700 mb-6">Please read these terms and conditions carefully before using Our Service.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Interpretation and Definitions</h2>
      <h3 className="text-xl font-semibold mt-6 mb-1">Interpretation</h3>
      <p className="text-gray-700 mb-4">
        The words of which the initial letter is capitalized have meanings defined under the following conditions...
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-1">Definitions</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li><strong>Affiliate:</strong> means an entity that controls...</li>
        <li><strong>Country:</strong> refers to: Delhi, India</li>
        <li><strong>Company:</strong> refers to GenLogo...</li>
        <li><strong>Device:</strong> means any device that can access the Service...</li>
        <li><strong>Service:</strong> refers to the Website.</li>
        <li><strong>Terms and Conditions:</strong> these terms form the agreement between you and the Company.</li>
        <li><strong>Third-party Social Media Service:</strong> services provided by third parties...</li>
        <li><strong>Website:</strong> refers to GenLogo, accessible from <a href="https://ai-based-logo-generator.vercel.app" className="text-blue-600 hover:underline">https://ai-based-logo-generator.vercel.app</a></li>
        <li><strong>You:</strong> the individual or entity using the Service.</li>
      </ul>

      {/* Add the rest of your sections like Acknowledgment, Termination, etc., with similar styling */}
      
      <h2 className="text-2xl font-semibold mt-10 mb-2">Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions about these Terms and Conditions, you can contact us:
      </p>
      <ul className="list-disc list-inside text-gray-700 mt-2">
        <li>By visiting this page on our website: <a href="https://ai-based-logo-generator.vercel.app/" className="text-blue-600 hover:underline" target="_blank">https://ai-based-logo-generator.vercel.app/</a></li>
      </ul>
    </main>
  );
}
