import Seal from "../assets/icons/preparations_details/Seal.svg"
import GreenTick from "../assets/icons/preparations_details/green tick.svg"
import Lock from "../assets/icons/preparations_details/lock.svg"
import RoundTick from "../assets/logos/preparation/fifth.png"


interface Status {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  isActive: boolean;
}

const statuses: Status[] = [
  { label: "Locked", icon: Lock, isActive: true },
  { label: "Sealed", icon: Seal, isActive: true },
  { label: "Completed", icon: RoundTick, isActive: false },
];

export const StatusRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mt-4 grid-wrap">
      {statuses.map((status, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between border-[#FAF9FA] rounded-full px-5 py-3  shadow-sm transition-colors bg-[#FAF9FA]`}
        >
          {/* Left side: icon + label */}
          <div className="flex items-center gap-2 text-gray-700">
            <img src={status.icon} alt="" />
            <span className="text-sm font-light">{status.label}</span>
          </div>

          {/* Right side: check indicator */}
          <div
            className={`h-4 w-4 rounded-full flex items-center justify-center ${status.isActive ? "bg-green-500" : "bg-gray-300"
              }`}
          >
            {status.isActive && (
              <img src={GreenTick} alt="" className="bg-green-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
