import { useEffect, useState } from "react";
import galleyXplanner from "../assets/logos/galleyXplanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import EmiratesLogo from "../assets/logos/emirates.svg";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isNarrow, setIsNarrow] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth <= 1366);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-full bg-white h-14 lg:h-16 font-rubik flex items-center justify-between px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-3">
        {isNarrow && (
          <button
            onClick={onMenuClick}
            className="text-gray-600 focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        )}

        <img
          src={galleyXplanner}
          alt="Main Logo"
          className={`h-6 lg:h-7 w-auto transition-all duration-300 ${
            isNarrow ? "ml-3" : "ml-0"
          }`}
        />
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <span className="hidden sm:inline text-gray-700">Shitanshu</span>
        <img src={EmiratesLogo} className="w-25 z-100 h-25 shadow-2xl" />
      </div>
    </nav>
  );
};

export default Navbar;
