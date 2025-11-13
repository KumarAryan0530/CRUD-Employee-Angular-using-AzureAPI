/**
 * API Configuration
 * 
 * Update the API endpoint here to point to your ASP.NET backend
 * 
 * Example:
 * - Local Development: http://localhost:5000/api
 * - Production: https://api.yourdomain.com/api
 */

export const API_CONFIG = {
  // Base API URL - IMPORTANT: Update this to your ASP.NET backend URL
  baseUrl: 'http://localhost:5000/api',

  // Employee endpoints
  endpoints: {
    employees: '/employees',
  },

  // Request timeout in milliseconds
  timeout: 30000,

  // Enable debug logging
  debug: true,
};

/**
 * How to configure the API URL:
 * 
 * 1. For local development:
 *    baseUrl: 'http://localhost:5000/api'
 * 
 * 2. For production (make sure CORS is configured on backend):
 *    baseUrl: 'https://api.production.com/api'
 * 
 * 3. Environment-based configuration:
 *    import { environment } from '../environments/environment';
 *    baseUrl: environment.apiUrl
 */
