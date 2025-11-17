import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { IFCSLogo } from "../../assets/icons";

const MealCountPDF: React.FC = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();

    const flightNumber = params.flightNumber as string;
    const scale = searchParams.get("scale") || "100";

    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="mx-auto max-w-4xl">
                {/* Logo and Title */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col items-center">
                        <img src={IFCSLogo} alt="OMAN AIR" className="h-12 mb-1" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-600 pt-3">Meal Count</h1>
                </div>

                {/* Flight Info */}
                <div className="text-center  mb-4">
                    <h2 className="text-3xl font-normal text-gray-700">
                        WY251 | MCT-MAA | Nov 5, 2025
                    </h2>
                </div>

                {/* Total */}
                <div className="flex justify-end mb-3">
                    <span className="text-sm font-bold">Total : 556</span>
                </div>

                {/* Table */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 border-t border-b border-gray-400">
                            <th className="text-left py-2 px-3 font-bold text-sm text-gray-800">Meal Code</th>
                            <th className="text-left py-2 px-3 font-bold text-sm text-gray-800">Name</th>
                            <th className="text-right py-2 px-3 font-bold text-sm text-gray-800">Count</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {/* WY251 Header */}
                        <tr className="bg-gray-100">
                            <td className="py-2 px-3 font-bold text-gray-800">WY251</td>
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3 text-right font-semibold">Pax Total : 131</td>
                        </tr>

                        {/* Business Section */}
                        <tr className="bg-white">
                            <td className="py-2 px-3 pl-6 font-bold text-gray-800">Business</td>
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3 text-right font-semibold">5</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">MD04-809</td>
                            <td className="py-1.5 px-3 text-gray-700">MIX VEG PULAO</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">ME-072</td>
                            <td className="py-1.5 px-3 text-gray-700">PLAIN PARATHA (IN-HOUSE)</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">ME-139</td>
                            <td className="py-1.5 px-3 text-gray-700">PAPADAM (EY FOIL 6" SIZE) (1NO/PAX)</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">ME-179</td>
                            <td className="py-1.5 px-3 text-gray-700">MANGO ACHAR (IN WHITE TUB)</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">RD05-813</td>
                            <td className="py-1.5 px-3 text-gray-700">Stuffed Chicken Breast w/ Spiced potatoes</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">RG02-152</td>
                            <td className="py-1.5 px-3 text-gray-700">Walnut Biscotti / Honey Oat Cookies</td>
                            <td className="py-1.5 px-3 text-right">2</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">RH01-299</td>
                            <td className="py-1.5 px-3 text-gray-700">Kraftcorn Roll, Spinach Roll</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">RL-156</td>
                            <td className="py-1.5 px-3 text-gray-700">Fresh Orange Juice (WY)</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">RL-189</td>
                            <td className="py-1.5 px-3 text-gray-700">Fresh Lemon & Mint Juice (WY)</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">RZ39-079</td>
                            <td className="py-1.5 px-3 text-gray-700">Herb Kit</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">TSU 5</td>
                            <td className="py-1.5 px-3 text-gray-700">TSU-ISC/JC/LD Cycle 1</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>

                        {/* Economy Section */}
                        <tr className="bg-white">
                            <td className="py-2 px-3 pl-6 font-bold text-gray-800">Economy</td>
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3 text-right font-semibold">126</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">AVML</td>
                            <td className="py-1.5 px-3 text-gray-700"></td>
                            <td className="py-1.5 px-3 text-right">26</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">MD-121</td>
                            <td className="py-1.5 px-3 text-gray-700">Omani Chicken Kabouli</td>
                            <td className="py-1.5 px-3 text-right">27</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">MD04-835</td>
                            <td className="py-1.5 px-3 text-gray-700">DAL TADKA</td>
                            <td className="py-1.5 px-3 text-right">54</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">MOML</td>
                            <td className="py-1.5 px-3 text-gray-700"></td>
                            <td className="py-1.5 px-3 text-right">2</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">RD06-452</td>
                            <td className="py-1.5 px-3 text-gray-700">Fish Masala</td>
                            <td className="py-1.5 px-3 text-right">27</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">TSU 1</td>
                            <td className="py-1.5 px-3 text-gray-700">TSU-ISC/YC/LD Cycle 1</td>
                            <td className="py-1.5 px-3 text-right">107</td>
                        </tr>

                        {/* WY252 Header */}
                        <tr className="bg-gray-100">
                            <td className="py-2 px-3 font-bold text-gray-800">WY252</td>
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3 text-right font-semibold">Pax Total : 148</td>
                        </tr>

                        {/* Business Section */}
                        <tr className="bg-white">
                            <td className="py-2 px-3 pl-6 font-bold text-gray-800">Business</td>
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3 text-right font-semibold">4</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">AVML</td>
                            <td className="py-1.5 px-3 text-gray-700"></td>
                            <td className="py-1.5 px-3 text-right">6</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="py-1.5 px-3 pl-10 text-gray-700">MD04-817</td>
                            <td className="py-1.5 px-3 text-gray-700">VEG JALFREZI, BASMATI RICE, ALOO METHI,TOMATO WEDGE</td>
                            <td className="py-1.5 px-3 text-right">1</td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer */}
                <div className="flex justify-between mt-8 text-xs text-gray-600">
                    <span>Print Date: Nov 17,2025</span>
                    <span>Page No: 1</span>
                </div>
            </div>
        </div>
    );
};

export default MealCountPDF;