import dashBg from "../assets/dashBg.png";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const buttons = [
    "Documents",
    "Memos",
    "Support Tickets",
    "Scorecard",
    "System Messages",
    "Compliance",
  ];

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="relative w-full min-h-56 sm:min-h-64 md:min-h-72 lg:min-h-80 rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${dashBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-6 lg:p-8">
        {/* Top Section */}
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className="text-white">
            <p className="text-xs sm:text-sm md:text-base">Welcome</p>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold">
              {userName}
            </h1>
          </div>
          <div className="bg-white text-gray-800 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 rounded-md shadow-sm">
            {formattedDate}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className="flex-1 min-w-[120px] max-w-[200px]
                 bg-white/5 backdrop-blur-sm hover:bg-white/10
                 font-semibold sm:font-bold md:font-extrabold 
                 h-12 sm:h-14 md:h-16 lg:h-20
                 text-xs sm:text-sm md:text-base lg:text-lg 
                 text-white px-2 sm:px-3 md:px-4 
                 rounded-md border border-white 
                 transition-colors duration-300"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
