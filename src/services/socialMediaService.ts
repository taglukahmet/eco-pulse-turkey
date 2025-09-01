import api from './api';

// TODO: Backend endpoints for social media data
export const socialMediaService = {
  // Get social media data for a specific city
  getCitySocialMediaData: async (cityName: string): Promise<any> => {
    const response = await api.get(`/social-media/city/${encodeURIComponent(cityName)}`);
    return response.data;
  },

  // Get national social media comparison data
  getNationalSocialMediaData: async (): Promise<any> => {
    const response = await api.get('/social-media/national');
    return response.data;
  },

  // Get platform-specific analytics
  getPlatformAnalytics: async (platform: string, location?: string): Promise<any> => {
    const params = location ? { location } : {};
    const response = await api.get(`/social-media/platform/${platform}`, { params });
    return response.data;
  },

  // Get trending topics and hashtags
  getTrendingData: async (location?: string): Promise<any> => {
    const params = location ? { location } : {};
    const response = await api.get('/social-media/trending', { params });
    return response.data;
  },
};