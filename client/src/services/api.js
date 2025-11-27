import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 2 minute timeout for Claude API calls (web search can be slow)
});

/**
 * Fetch activity recommendations from backend
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.city - City name
 * @param {string} searchParams.ages - Children's ages
 * @param {string} searchParams.availability - When they're available
 * @param {number} searchParams.distance - Max distance in miles
 * @param {string} searchParams.preferences - Optional preferences
 * @returns {Promise<Object>} Activity recommendations
 */
export async function fetchActivities(searchParams) {
  try {
    const response = await apiClient.post('/api/activities', searchParams);
    return response.data;
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.error || 'Failed to get recommendations');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Cannot connect to server. Please make sure the server is running.');
    } else {
      // Something else went wrong
      throw new Error('An unexpected error occurred');
    }
  }
}

export default {
  fetchActivities,
};
