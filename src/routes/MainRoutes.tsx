import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from 'react';
import Loader from "../components/common/Loader";
const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/main-pages/Dashboard"));
const Layout = lazy(() => import("../components/Layout"));
const Flight = lazy(() => import("../pages/main-pages/Flight"));
const FlightList = lazy(() => import("../pages/flight/FlightList"));
const GalleyPlanner = lazy(() => import("../pages/main-pages/GalleyPlanner"));
const MealPlanner = lazy(() => import("../pages/main-pages/MealPlanner"));
const Compliance = lazy(() => import("../pages/main-pages/Compliance"));
const Reports = lazy(() => import("../pages/main-pages/Reports"));
const Setup = lazy(() => import("../pages/main-pages/Setup"));
const FlightDetails = lazy(() => import("../pages/flight/FlightDetails"));
const ComplianceTrackingList = lazy(() => import("../pages/compliance/ComplianceTrackingList"));
const ComplianceTrackingDetails = lazy(() => import("../pages/compliance/ComplianceTrackingDetails"));

function MainRoutes() {
  return (
    <Suspense fallback={<Loader />}>
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
          path="/compliance/compliance-tracking/:cityName/:flightNo/:date"
          element={<ComplianceTrackingDetails />}
        />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}

export default MainRoutes;
