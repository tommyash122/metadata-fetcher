import axios from 'axios';

export const fetchMetadata = async (urls) => {
  try {
    // Fetch CSRF token from the server
    const csrfResponse = await axios.get('/csrf-token');
    const csrfToken = csrfResponse.data.csrfToken;

    const response = await axios.post('/fetch-metadata', { urls }, {
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch metadata');
  }
};
