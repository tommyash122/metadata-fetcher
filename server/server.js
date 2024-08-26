require('dotenv').config();

const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
]);
const cheerio = require('cheerio');
const helmet = require('helmet');
const escapeHtml = require('escape-html');
const cookieParser = require('cookie-parser');
const Joi = require('joi');
// const csrf = require('csurf');
const crypto = require('crypto');
const cors = require('cors');

const app = express();

// const csrfProtection = csrf({
//   cookie: {
//     secure: true, // Ensures the cookie is sent only over HTTPS
//     httpOnly: true, // Prevents JavaScript from accessing the cookie
//     sameSite: 'Strict', // Prevents CSRF from cross-site requests
//   },
// });

function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}


app.use(cors({
  origin: 'https://metadata-fetcher-seven.vercel.app',
  credentials: true,
}));

// Set up security middleware
app.use(helmet()); // Security middleware

// Set up middleware for parsing cookies and JSON bodies
app.use(cookieParser()); // Parse cookies
// app.use(csrfProtection);
app.use(express.json()); // Parse JSON bodies

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again after a second.',
});
app.use(limiter);

// Main route 
app.get('/', (req, res) => {
  const title = escapeHtml('Metadata Fetcher');

  res.send(`
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h1>Welcome to the Metadata Fetcher Application</h1>
        <p>This server powers the awesome Metadata Fetcher app, designed to extract and present metadata from any URL you provide.</p>
        <p>Whether you're looking to grab a website's title, description, or other key details, this service is here to help!</p>
        <p><em>Stay tuned for more features and enhancements.</em></p>
      </body>
    </html>
  `);
});

app.get('/csrf-token', (_req, res) => {
  const token = generateCSRFToken();
  res.cookie('XSRF-TOKEN', token, {
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    secure: true, // Ensure the cookie is only sent over HTTPS
    sameSite: 'Strict', // Ensure the cookie is not sent with cross-site requests
  });
  res.json({ csrfToken: token });
});


// Protected route for fetching metadata
app.post('/fetch-metadata', async (req, res) => {
  const csrfToken = req.headers['x-csrf-token'] || req.cookies['XSRF-TOKEN'];
  if (csrfToken !== req.cookies['XSRF-TOKEN']) {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  // Validate the input URLs
  const { error } = Joi.array().items(Joi.string().uri()).min(3).required().validate(req.body.urls);

  if (error) {
    return res.status(400).json({
      message: 'Invalid input',
      details: error.details.map(detail => detail.message),
    });
  }

  const { urls } = req.body;

  try {
    const metadataPromises = urls.map(async (url) => {
      try {
        // Make the HTTP request to fetch the HTML content
        const response = await axios.get(url);
        const html = response.data;

        // Use Cheerio and metascraper to extract metadata
        const $ = cheerio.load(html);
        const metadata = await metascraper({ html, url });

        // Check if metadata is found
        if (!metadata.title && !metadata.description && !metadata.image) {
          throw new Error('No metadata found');
        }

        return metadata;
      } catch (error) {
        if (error.response) {
          // HTTP response errors
          return {
            error: `Failed to retrieve metadata for ${url}: Received ${error.response.status} ${error.response.statusText}`,
          };
        } else if (error.request) {
          // Network errors
          return {
            error: `Failed to retrieve metadata for ${url}: No response received from the server`,
          };
        } else {
          // Other errors (e.g., request setup)
          return {
            error: `Failed to retrieve metadata for ${url}: ${error.message}`,
          };
        }
      }
    });

    // Wait for all metadata requests to complete
    const metadata = await Promise.all(metadataPromises);

    // Check if any errors occurred during the process
    const errors = metadata.filter(item => item.error);
    if (errors.length > 0) {
      return res.status(206).json({ // 206 Partial Content
        message: 'Some metadata could not be retrieved',
        errors,
        metadata: metadata.filter(item => !item.error),
      });
    }

    // Return the successfully retrieved metadata
    res.json({ metadata });
  } catch (error) {
    // Catch any unexpected errors
    console.error('Unexpected error during metadata retrieval:', error);
    res.status(500).json({
      message: 'An internal server error occurred while processing your request.',
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;