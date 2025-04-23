// pages/privacy-policy.js

import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | GenLogo</title>
        <meta name="description" content="Privacy policy for GenLogo AI-based logo generator" />
      </Head>

      <main className="px-4 py-8 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: April 23, 2025</p>

        <section className="space-y-4">
          <p>
            This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information when you use the
            Service and tells you about your privacy rights and how the law protects you.
          </p>
          <p>
            We use your personal data to provide and improve the service. By using the service, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Interpretation and Definitions</h2>

          <h3 className="text-xl font-medium mt-6 mb-2">Interpretation</h3>
          <p className="mb-4">
            The words with the first letter capitalized have meanings defined under the following conditions. The following definitions shall have the
            same meaning regardless of whether they appear in singular or plural.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-2">Definitions</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Account:</strong> A unique account created for you to access our service.
            </li>
            <li>
              <strong>Company:</strong> Refers to GenLogo.
            </li>
            <li>
              <strong>Cookies:</strong> Small files placed on your device to enhance your user experience.
            </li>
            <li>
              <strong>Country:</strong> Refers to Delhi, India.
            </li>
            <li>
              <strong>Device:</strong> Any device that can access the Service like a computer or phone.
            </li>
            <li>
              <strong>Personal Data:</strong> Any info that identifies an individual.
            </li>
            <li>
              <strong>Service:</strong> Refers to the Website.
            </li>
            <li>
              <strong>Website:</strong> GenLogo, accessible from{' '}
              <a
                href="https://ai-based-logo-generator.vercel.app/"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ai-based-logo-generator.vercel.app/
              </a>
            </li>
            <li>
              <strong>You:</strong> The user of the service.
            </li>
          </ul>
        </section>

        {/* More sections below -- feel free to paste additional ones using same format */}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, you can contact us:</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              By visiting this page on our website:{' '}
              <a
                href="https://ai-based-logo-generator.vercel.app/"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ai-based-logo-generator.vercel.app/
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
