import axiosInstance from "../config/axiosInstance";

export const getAirlines = async () => {
  const res = await axiosInstance.get("/airlines");
  return res.data?.data || [];
};

export const getAirports = async () => {
  const res = await axiosInstance.get("/destinations");
  return res.data?.data || [];
};

export const getAircrafts = async () => {
  const res = await axiosInstance.get("/aircrafts");
  return res.data?.data || [];
};
