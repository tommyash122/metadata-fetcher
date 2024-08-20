import axios from 'axios';

export const fetchMetadata = async (urls) => {
  try {
    const response = await axios.post('/fetch-metadata', { urls });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch metadata');
  }
};
