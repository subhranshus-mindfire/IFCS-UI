import {
  type IconDefinition,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface NavigationProps {
  title: string;
  icon: IconDefinition;
  to: string;
  active?: boolean;
}

const NavigationCard: React.FC<NavigationProps> = ({
  title,
  icon,
  to,
  active = true,
}) => {
  return (
    <Link
      to={to}
      onClick={(e) => {
        if (!active) e.preventDefault();
      }}
    >
      <div
        className={`
          relative md:w-100 w-70 h-40 flex flex-col justify-center items-center 
          px-10 border border-[var(--backgroundAccent)] rounded-2xl
          transition-transform duration-300 ease-in-out
        ${active && "hover:shadow-lg hover:scale-102"}`}
      >
        {active && (
          <FontAwesomeIcon
            icon={faArrowUp}
            className="absolute top-2 right-2 text-gray-500 rotate-45"
          />
        )}
        <FontAwesomeIcon
          color={active ? "black" : "gray"}
          icon={icon}
          size="4x"
          className="mb-3"
        />

        <h1
          className={`text-lg font-semibold ${
            active ? "text-black" : "text-gray-600"
          }`}
        >
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default NavigationCard;
