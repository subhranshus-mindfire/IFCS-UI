import axios from "../config/axiosInstance";

export const getFoodOrderItems = async (flightId: string) => {
  const response = await axios.get(`/api/v1/flights/${flightId}/food-order-items`);
  return response.data.data; 
};
