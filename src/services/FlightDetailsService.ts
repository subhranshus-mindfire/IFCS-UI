import axiosInstance from "../config/axiosInstance";

export const flightDetailsService = {
  async getFlightById(flightId: string) {
    try {
      const response = await axiosInstance.get(`/api/v1/flights/${flightId}`);
      return response.data?.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Flight API Error:", error);
      throw error;
    }
  }
};
