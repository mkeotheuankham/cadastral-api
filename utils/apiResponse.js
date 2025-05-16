/**
 * Standard API Response Handler
 * Provides consistent response formatting for all API endpoints
 */

/**
 * Main API response function
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} data - Response data payload
 * @param {String} message - Optional message
 * @returns {Object} Formatted JSON response
 */
const apiResponse = (res, statusCode, data = {}, message = null) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    timestamp: new Date().toISOString(),
    statusCode,
    ...(message && { message }),
    ...data
  };

  // Log server errors
  if (statusCode >= 500) {
    console.error(`[${response.timestamp}] Server Error:`, data.error || message);
  }

  return res.status(statusCode).json(response);
};

// Specific response helpers
module.exports = {
  /**
   * 200 OK Response
   * @param {Object} res - Express response object
   * @param {Object} data - Response data
   * @param {String} message - Optional success message
   */
  success: (res, data = {}, message = 'Request successful') => {
    return apiResponse(res, 200, { data }, message);
  },

  /**
   * 201 Created Response
   * @param {Object} res - Express response object 
   * @param {Object} data - Created resource data
   * @param {String} message - Optional creation message
   */
  created: (res, data = {}, message = 'Resource created successfully') => {
    return apiResponse(res, 201, { data }, message);
  },

  /**
   * 400 Bad Request Response
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   * @param {Array} errors - Optional validation errors
   */
  badRequest: (res, message = 'Bad request', errors = []) => {
    return apiResponse(res, 400, { errors }, message);
  },

  /**
   * 401 Unauthorized Response
   * @param {Object} res - Express response object
   * @param {String} message - Authentication error message
   */
  unauthorized: (res, message = 'Unauthorized access') => {
    return apiResponse(res, 401, {}, message);
  },

  /**
   * 403 Forbidden Response 
   * @param {Object} res - Express response object
   * @param {String} message - Authorization error message
   */
  forbidden: (res, message = 'Forbidden') => {
    return apiResponse(res, 403, {}, message);
  },

  /**
   * 404 Not Found Response
   * @param {Object} res - Express response object
   * @param {String} message - Not found message
   */
  notFound: (res, message = 'Resource not found') => {
    return apiResponse(res, 404, {}, message);
  },

  /**
   * 409 Conflict Response
   * @param {Object} res - Express response object
   * @param {String} message - Conflict message
   * @param {Object} data - Additional conflict data
   */
  conflict: (res, message = 'Conflict', data = {}) => {
    return apiResponse(res, 409, data, message);
  },

  /**
   * 500 Server Error Response
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   * @param {Object} error - Error details (only in development)
   */
  serverError: (res, message = 'Internal server error', error = null) => {
    const data = process.env.NODE_ENV === 'development' ? { error } : {};
    return apiResponse(res, 500, data, message);
  },

  /**
   * Custom Response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {Object} data - Response data
   * @param {String} message - Optional message
   */
  custom: (res, statusCode, data = {}, message = null) => {
    return apiResponse(res, statusCode, data, message);
  }
};