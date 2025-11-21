import axiosInstance from "../api/axiosInstance";

export const getAirlines = async () => {
  const res = await axiosInstance.get("/api/v1/airlines");
  return res.data?.data || [];
};

export const getAirports = async () => {
  const res = await axiosInstance.get("/api/v1/airports");
  return res.data?.data || [];
};

export const getAircrafts = async () => {
  const res = await axiosInstance.get("/api/v1/aircrafts");
  return res.data?.data || [];
};
