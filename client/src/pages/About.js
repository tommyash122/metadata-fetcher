import React from 'react';

function About() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-purple-400 text-center mb-6">About This App</h1>
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
        <li>Responsive design and interactive UI elements.</li>
      </ul>
    </div>
  );
}

export default About;
