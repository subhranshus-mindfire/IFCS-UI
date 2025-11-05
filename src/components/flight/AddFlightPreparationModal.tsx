import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faUtensils, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const itemsData = [
  { code: '001-024', name: 'Eco Beef Lasagnette', category: 'Bistro' },
  { code: '001-025', name: 'Asian Veg Meal', category: 'Bistro' },
  { code: '001-029', name: 'Eco Chilli Cheese Pasta', category: 'Bistro' },
  { code: '030-037', name: 'Eco Chilli Veg', category: 'Bistro' },
  { code: '001-024', name: 'Eco Beef Lasagnette', category: 'Bistro' },
  { code: '001-025', name: 'Asian Veg Meal', category: 'Bistro' },
  { code: '001-029', name: 'Eco Chilli Cheese Pasta', category: 'Bistro' },
  { code: '030-037', name: 'Eco Chilli Veg', category: 'Bistro' },
  { code: '001-024', name: 'Eco Beef Lasagnette', category: 'Bistro' },
  { code: '001-025', name: 'Asian Veg Meal', category: 'Bistro' },
  { code: '001-029', name: 'Eco Chilli Cheese Pasta', category: 'Bistro' },
  { code: '030-037', name: 'Eco Chilli Veg', category: 'Bistro' },
];
interface DynamicLoadingModalProps {
  onClose: () => void;
}

const DynamicLoadingModal: React.FC<DynamicLoadingModalProps> = ({ onClose }) => {
  const [activeType, setActiveType] = useState('Meal');

  return (
    <div 
      className="fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center z-50 p-4"
      onClick={onClose} 
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col border border-dashed border-blue-500 p-6"
        onClick={(e) => e.stopPropagation()}
      >

        {/* 1. Header Section */}
        <div className="mb-4">
          <h1 className="text-xl font-medium text-gray-800 mb-4">
            Add Dynamic Loading
          </h1>
          <h2 className="text-lg font-semibold text-[#4F4B58] mb-4">
            TS296 / YUL-BSL / Jul16, 2025
          </h2>

          {/* Flight Info Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 py-4 border border-gray-300 rounded-3xl text-sm">
            <div className="flex justify-between p-2">
              <span className="text-gray-500">Aircraft</span>
              <span className="font-semibold text-gray-800">TS296</span>
            </div>
            <div className="flex justify-between p-2">
              <span className="text-gray-500">AC Reg.</span>
              <span className="font-semibold text-gray-800">C-GOIX</span>
            </div>
            <div className="flex justify-between p-2">
              <span className="text-gray-500">Destination</span>
              <span className="font-semibold text-gray-800">BSL</span>
            </div>
            <div className="flex justify-between p-2">
              <span className="text-gray-500">Loading Plan</span>
              <span className="font-semibold text-gray-800">Global</span>
            </div>
          </div>
        </div>

        {/* 2. Search Bar */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-500 mb-1">Search</h3>
          <input
            type="text"
            placeholder="Search by Code, Name, Category"
            className="w-full px-4 py-2 border-b-2 border-dashed border-blue-300 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* 3. Content Area (Tabs and Table) */}
        <div className="flex flex-1 overflow-hidden">

          {/* Item Type Tabs (Left Sidebar) */}
          <div className="w-1/4 min-w-[150px] mr-6">
            <h3 className="text-sm text-gray-500 mb-3">Select Item Type</h3>
            <div className="flex flex-col gap-2">
              {/* Meal Tab */}
              <button
                onClick={() => setActiveType('Meal')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeType === 'Meal'
                ? 'bg-[#E2D8FD] text-[#27262C] shadow-md'
                  : 'text-[#A09CAB] bg-[#FAF9FA]'
                  }`}
              >
                <FontAwesomeIcon icon={faUtensils} className="w-4 h-4" /> Meal
              </button>

              {/* Provision Tab */}
              <button
                onClick={() => setActiveType('Provision')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeType === 'Provision'
                  ? 'bg-[#E2D8FD] text-[#27262C] shadow-md'
                  : 'text-[#A09CAB] bg-[#FAF9FA]'
                  }`}
              >
                <FontAwesomeIcon icon={faMugHot} className="w-4 h-4" /> Provision
              </button>
            </div>
          </div>

          {/* Item List Table (Right Content) */}
          <div className="flex-1 overflow-hidden">
            <h3 className="text-sm text-gray-500 mb-3">Select Item</h3>
            <div className="h-full overflow-y-auto border border-gray-200 rounded-lg">
              <table className="min-w-full text-sm border-collapse">
                <thead className="bg-gray-50 text-gray-600 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Code</th>
                    <th className="px-3 py-2 text-left font-medium">Name</th>
                    <th className="px-3 py-2 text-left font-medium">Category</th>
                    <th className="px-3 py-2 text-center font-medium w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsData.map((item, index) => (
                    <tr
                      key={index}
                      className={`${index === 0 ? 'bg-[#E2D8FD]' : 'bg-white'} border-b border-gray-100 last:border-b-0`}
                    >
                      <td className="px-3 py-2 text-gray-800 font-medium">{item.code}</td>
                      <td className="px-3 py-2 text-gray-600">{item.name}</td>
                      <td className="px-3 py-2 text-gray-600">{item.category}</td>
                      <td className="px-3 py-2 text-center">
                        <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. Footer Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-4">
          <button className="px-6 py-2 text-gray-700 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition" onClick={onClose}>
            Cancel
          </button>
          <button className="px-6 py-2 bg-[#602AF3] text-white text-sm font-medium rounded-lg hover:bg-white hover:text-[#602AF3] transition shadow-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicLoadingModal;