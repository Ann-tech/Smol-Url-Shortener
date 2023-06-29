const axios = require('axios');

const checkUrlAvailability = async (url) => {
    try {
      const response = await axios.head(url);
      if (response.status >= 400) {
        throw new Error(`URL unavailable: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error accessing URL: ${error.message}`);
    }
};

module.exports = {
    checkUrlAvailability
}