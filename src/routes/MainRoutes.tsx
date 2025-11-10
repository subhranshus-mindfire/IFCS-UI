import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/main-pages/Dashboard";
import Layout from "../components/Layout";
import Flight from "../pages/main-pages/Flight";
import FlightList from "../pages/flight/FlightList";
import GalleyPlanner from "../pages/main-pages/GalleyPlanner";
import MealPlanner from "../pages/main-pages/MealPlanner";
import Compliance from "../pages/main-pages/Compliance";
import Reports from "../pages/main-pages/Reports";
import Setup from "../pages/main-pages/Setup";
import FlightDetails from "../pages/flight/FlightDetails";
import ComplianceTrackingList from "../pages/compliance/ComplianceTrackingList";
import ComplianceTrackingDetails from "../pages/compliance/ComplianceTrackingDetails";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/galley-planner" element={<GalleyPlanner />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/setup" element={<Setup />} />
      </Route>
      <Route path="/flight-list" element={<FlightList />} />
      <Route path="/flight-details/:flightNumber" element={<FlightDetails />} />
      <Route
        path="/compliance/compliance-tracking/:cityName"
        element={<ComplianceTrackingList />}
      />
      <Route
        path="/compliance/compliance-tracking/:cityName/:flightNo-:date"
        element={<ComplianceTrackingDetails />}
      />

      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default MainRoutes;
