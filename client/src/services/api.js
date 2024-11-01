import axios from 'axios';

export const fetchMetadata = async (urls) => {
  try {
    const serverBaseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_SERVER_URL_DEV : process.env.REACT_APP_SERVER_URL;

    // Fetch CSRF token from the server
    const csrfTokenResponse = await axios.get(`${serverBaseUrl}/csrf-token`, { withCredentials: true });
    const csrfToken = csrfTokenResponse.data.csrfToken;

    // Make the request to the server-side API with the CSRF token
    const response = await axios.post(
      `${serverBaseUrl}/fetch-metadata`,
      { urls },
      {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch metadata');
  }
};