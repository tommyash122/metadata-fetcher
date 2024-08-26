import axios from 'axios';

export const fetchMetadata = async (urls) => {
  try {
    const serverBaseUrl = 'https://metadata-fetcher-server.vercel.app';

    // Fetch CSRF token from the server
    const csrfResponse = await axios.get(`${serverBaseUrl}/csrf-token`);
    console.log("csrfResponse", csrfResponse)
    const csrfToken = csrfResponse.data.csrfToken;
    console.log("csrfToken", csrfToken)
    // Make the request to the server-side API with the CSRF token
    const response = await axios.post(
      `${serverBaseUrl}/fetch-metadata`,
      { urls },
      {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch metadata');
  }
};
