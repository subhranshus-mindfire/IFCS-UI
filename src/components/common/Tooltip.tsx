import { useState, useRef } from "react";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className="absolute z-30 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap bottom-full left-1/2 -translate-x-1/2 mb-1"
                >
                    {text}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </div>
    );
};