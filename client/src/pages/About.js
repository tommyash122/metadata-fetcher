import React from 'react';

function About() {
  return (
    <div>
      <p>
        This application allows you to fetch metadata from any valid URLs. You can enter the URLs, and the app will retrieve information such as the title, description, and images associated with each URL.
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Enter one or more URLs in the input fields on the home page.</li>
        <li>Use the "Add URL" button to add more input fields if needed.</li>
        <li>Click "Submit" to fetch the metadata for the entered URLs.</li>
        <li>Invalid URLs will be highlighted with a red border.</li>
        <li>In the results, you can edit the metadata or reset it to its original values.</li>
      </ul>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Edit the fetched metadata directly in the results view.</li>
        <li>Reset the metadata to its original state.</li>
        <li>Copy and paste URLs with ease.</li>
        <li>Automatic validation mechanism that checks if your URL is valid.</li>
        <li>Add as many URLs as you like, with a minimum of 3 required.</li>
        <li>All metadata processing is handled server-side.</li>
        <li>Responsive design and interactive UI elements, including animations.</li>
        <li>Implement rate limiting on the server to handle a maximum of 5 requests per second.</li>
        <li>Unit tests are in place for both the front-end and back-end to ensure reliability.</li>
        <li>Robust error handling on both the client and server sides.</li>
      </ul>
    </div>
  );
}

export default About;
