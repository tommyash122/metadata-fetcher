# Metadata Fetcher

Metadata Fetcher is a powerful and efficient application that allows you to retrieve metadata from any valid URL. Whether you're a developer, a marketer, or just someone curious about the details behind a webpage, this app has you covered. It extracts essential metadata such as titles, descriptions, and images from URLs, making it easier than ever to gather and use this information.

## 🚀 Features

- **Metadata Extraction**: Retrieve titles, descriptions, and images from any URL.
- **CSRF Protection**: Enhanced security with CSRF tokens.
- **Rate Limiting**: Protects your server from abuse by limiting requests to 5 per second.
- **Validation**: Automatic URL validation ensures only valid URLs are processed.
- **Error Handling**: Robust error management on both the client and server sides.
- **Editable Metadata**: Edit the fetched metadata directly within the results view.
- **Responsive Design**: The app is fully responsive and looks great on all devices.
- **Persistent Data**: Automatically saves your session data and restores it when you revisit.
- **Unit Testing**: Comprehensive tests ensure the reliability of both the front-end and back-end.
- **Ease of Use**: Intuitive UI with features like adding/removing URLs, editing metadata, and resetting data.

## 🛠️ Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [React](https://reactjs.org/)

### Setup

#### 1. Clone the repository

`git clone https://github.com/yourusername/metadata-fetcher.git`

`cd metadata-fetcher`


#### 2.Set up the Server
Navigate to the server directory and install the dependencies:
cd server
npm install

Create a .env file in the server directory and add the following environment variables:

`REACT_APP_PORT=8000`

`REACT_APP_CLIENT_URL=http://localhost:3000`

Start the server:

`npm start`

#### 3. Set up the Client
Navigate to the client directory and install the dependencies:

`cd ../client`

`npm install`

Create a .env.local file in the client directory and add the following environment variable:

`REACT_APP_SERVER_URL=http://localhost:8000`

Start the client:

`npm start`

The application will now be running at `http://localhost:3000`, with the server listening on port `8000`.

## 🧑‍💻 Usage    
Enter URLs: 
On the homepage, enter one or more URLs in the input fields.
Submit: Click the "Submit" button to fetch metadata for the entered URLs.
Edit Metadata: You can edit the metadata directly in the results view.
Reset: If needed, reset the metadata to its original state using the "Reset" button.
Add/Remove URLs: Easily add more input fields for URLs or remove existing ones.    

## ⚙️ Configuration
The application is highly configurable. You can adjust the rate limiting, modify security settings, and tweak the UI to suit your needs. The .env files allow you to easily switch between development and production environments.
    
## 🧪 Testing
The project includes unit tests for both the client and server. To run the tests:

Server Tests    

`cd server`

`npm test`

Client Tests

`cd ../client`

`npm test`

These tests ensure the functionality of key features such as metadata fetching, URL validation, and UI interactions.

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repository, make your changes, and submit a pull request. Please ensure that your code is well-tested and follows the project's coding standards.

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for more details.


### Explanation

- **Introduction**: Provides a concise overview of what the application does.
- **Features**: Highlights the key functionalities and benefits of the application.
- **Installation**: Step-by-step instructions on how to set up and run both the server and client sides of the application.
- **Usage**: Guides users on how to interact with the application.
- **Configuration**: Explains how to customize and configure the application.
- **Testing**: Instructions for running tests to ensure everything works as expected.
- **Contributing**: Encourages community contributions and outlines how to get involved.
- **License**: Specifies the licensing terms for using the project.
- **Contact**: Provides contact details for further inquiries.

Feel free to customize any section to better fit your project's specifics!



