import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faPlaneUp,
  faBowlRice,
  faFileLines,
  faCog,
  faServer,
  faCircleCheck,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import IFCSLogo from "../assets/logos/IFCSLogo.png";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: faGauge },
  { to: "/flights", label: "Flights", icon: faPlaneUp },
  { to: "/galley-planner", label: "Galley Planner", icon: faServer },
  { to: "/meal-planner", label: "Meal Planner", icon: faBowlRice },
  { to: "/compliance", label: "Compliance", icon: faCircleCheck },
  { to: "/reports", label: "Reports", icon: faFileLines },
  { to: "/setup", label: "Setup", icon: faCog },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1366);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Disable scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, isMobile]);

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-bg-surface p-2 rounded-md shadow-md"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      )}

      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`bg-bg-surface ${
          isMobile ? "fixed" : "static"
        } top-0 left-0 h-full w-64 bg-[var(--backgroundAccent)] shadow-md py-6 flex flex-col justify-between transition-transform duration-300 z-50
        ${isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}`}
      >
        {isMobile && (
          <div className="flex justify-end px-4 mb-2">
            <button onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>
        )}

        <nav className="flex-1 px-4 space-y-2 mt-2">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-gray-500 hover:bg-gray-200"
                }`
              }
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <FontAwesomeIcon icon={icon} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <img
            src={IFCSLogo}
            alt="Bottom Logo"
            className="w-24 md:w-32 mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
