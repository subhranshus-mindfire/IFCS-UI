import axiosInstance from "../config/axiosInstance";

export const loadingPlanService = {
  async getAllLoadingPlans() {
    const response = await axiosInstance.get("/api/v1/loading-plans");
    return response.data?.data || [];
  },
};
