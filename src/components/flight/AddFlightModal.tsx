// import type React from "react"
// import { useState, useRef, useEffect, useCallback } from "react"
// import { useFlightStore } from "../../store/flight";
// import type { AddFlightPayload, AddFormState, Aircraft, AirlineOption, AirportOption } from "../../types/Flight";
// import {
//   Field,
//   FieldLabel,
//   FieldContent
// } from "../Field";
// import { CalendarIcon } from "../../assets/icons";
// import Button from "../Button";
// import { getTodayString } from "../../lib/utils";

// export const AddFlightModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   const [formState, setFormState] = useState<AddFormState>({
//     airlineCode: "",
//     direction: "",
//     flightType: "J",
//     date: "",
//     departureTime: "",
//     arrivalTime: "",
//     flightNumber: "",
//     aircraftReg: "",
//     pax: { businessStudio: 0, business: 0, economy: 0, crew: 0 },
//     manualPairing: false,
//     manualLoadingPlanSelection: false,
//     manualMealPlanSelection: false,
//     departureAirport: "",
//     arrivalAirport: ""
//   });

//   const [showDepartureOptions, setShowDepartureOptions] = useState(false);
//   const [showArrivalOptions, setShowArrivalOptions] = useState(false);
//   const [localError, setLocalError] = useState<string | null>(null);

//   const { addFlight, isLoading, error, fetchFlightOptions,
//     airlineCodeOptions,
//     airportOptions,
//     aircraftRegOptions } = useFlightStore();
//   useEffect(() => {
//     fetchFlightOptions();
//   }, [fetchFlightOptions]);

//   const departureRef = useRef<HTMLDivElement | null>(null)
//   const arrivalRef = useRef<HTMLDivElement | null>(null)


//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({ ...prev, [name]: value }));
//   };
//   const handlePaxChange = (key: keyof AddFormState['pax'], value: string) => {
//     const num = parseInt(value, 10);

//     const numericValue = (!isNaN(num) && num >= 0) ? num : 0;

//     setFormState(prev => ({
//       ...prev,
//       pax: { ...prev.pax, [key]: numericValue }
//     }));
//   };

//   const handleToggleChange = (name: keyof AddFormState, checked: boolean) => {
//     setFormState(prev => ({ ...prev, [name]: checked }));
//   };

//   useEffect(() => {
//     function handleOutside(event: Event) {
//       const target = event.target as Node | null

//       if (departureRef.current && !departureRef.current.contains(target as Node)) {
//         setShowDepartureOptions(false)
//       }

//       if (arrivalRef.current && !arrivalRef.current.contains(target as Node)) {
//         setShowArrivalOptions(false)
//       }
//     }

//     document.addEventListener("mousedown", handleOutside)
//     document.addEventListener("touchstart", handleOutside)

//     return () => {
//       document.removeEventListener("mousedown", handleOutside)
//       document.removeEventListener("touchstart", handleOutside)
//     }
//   }, [])


//   const handleSubmit = useCallback(async (shouldClose: boolean) => {
//     setLocalError(null);
//     const { date, departureTime, arrivalTime, flightNumber, departureAirport, arrivalAirport, aircraftReg } = formState;

//     const mandatoryFields: (keyof AddFormState)[] = [
//       'date', 'departureTime', 'arrivalTime',
//       'flightNumber', 'departureAirport', 'arrivalAirport',
//       'airlineCode', 'aircraftReg', 'direction'
//     ];

//     const missingField = mandatoryFields.some(key => {
//       const value = formState[key];
//       return typeof value === 'string' && value.trim() === '';
//     });

//     if (missingField) {
//       setLocalError("Please fill in all mandatory fields.");
//       return;
//     }
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const selectedDate = new Date(date);
//     selectedDate.setHours(0, 0, 0, 0);

//     if (isNaN(selectedDate.getTime()) || selectedDate < today) {
//       setLocalError("Date must be today or a future date.");
//       return;
//     }
//     const totalPax = Object.values(formState.pax).reduce((sum, count) => sum + count, 0);

//     const payload: AddFlightPayload = {
//       airlineCode: formState.airlineCode,
//       direction: formState.direction,
//       flightType: formState.flightType,
//       date: date,
//       departureTime: departureTime,
//       arrivalTime: arrivalTime,
//       flightNumber: flightNumber,
//       departureAirport: departureAirport,
//       arrivalAirport: arrivalAirport,
//       aircraftReg: aircraftReg,
//       paxCount: totalPax,
//       manualPairing: formState.manualPairing,
//       manualLoadingPlanSelection: formState.manualLoadingPlanSelection,
//       manualMealPlanSelection: formState.manualMealPlanSelection,
//     };


//     await addFlight(payload);

//     if (shouldClose) {
//       onClose();
//     } else {
//       setFormState({
//         airlineCode: "WY",
//         direction: "[O/B]",
//         flightType: "J",
//         date: "",
//         departureTime: "",
//         arrivalTime: "",
//         flightNumber: "",
//         aircraftReg: "",
//         pax: { businessStudio: 0, business: 0, economy: 0, crew: 0 },
//         manualPairing: false,
//         manualLoadingPlanSelection: false,
//         manualMealPlanSelection: false,
//         departureAirport: "",
//         arrivalAirport: ""
//       });
//       setLocalError(null);
//     }

//   }, [formState, addFlight, onClose]);


//   return (
//     <div className="fixed inset-0 font-rubik bg-black/50 flex flex-col items-center justify-center z-50">
//       {/* Modal Header */}
//       <div className="w-full max-w-xl bg-green-600 text-white text-center py-2 rounded-t-lg">
//         <h2 className="text-sm font-semibold">Create Mode</h2>
//       </div>

//       <div className="bg-white shadow-lg w-full max-w-xl p-6 rounded-b-lg">

//         {/* Error Message Display */}
//         {(localError || error) && (
//           <div className="p-2 mb-4 text-[13px] font-medium text-red bg-red-100 border border-red-400 rounded">
//             {localError || `API Error: ${error}`}
//           </div>
//         )}

//         <div className="space-y-4">

//           {/* Row 1: Airline Code, Direction, Flight Type */}
//           <div className="grid grid-cols-3 gap-4">
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Airline Code</FieldLabel>
//               <FieldContent>
//                 <select
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
//                   name="airlineCode"
//                   value={formState.airlineCode}
//                   onChange={handleInputChange}
//                 >
//                   <option value=""></option>
//                   {airlineCodeOptions.map((code: AirlineOption) => (
//                     <option key={code.code} value={code.code}>{code.code}</option>
//                   ))}
//                 </select>
//               </FieldContent>
//             </Field>
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Direction</FieldLabel>
//               <FieldContent>
//                 <select
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
//                   name="direction"
//                   value={formState.direction}
//                   onChange={handleInputChange}
//                 >
//                   <option value=""></option>
//                   <option value="[O/B]">[O/B]</option>
//                   <option value="[I/B]">[I/B]</option>
//                 </select>
//               </FieldContent>
//             </Field>
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Flight Type</FieldLabel>
//               <FieldContent>
//                 <div className="flex items-center gap-4 pt-2">
//                   {["J", "P"].map((type) => (
//                     <label key={type} className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="flightType"
//                         value={type}
//                         checked={formState.flightType === type}
//                         onChange={handleInputChange}
//                         className="w-4 h-4 text-green-600 focus:ring-green-600"
//                       />
//                       <span className="text-text-secondary">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </FieldContent>
//             </Field>
//           </div>

//           {/* Row 2: Date, Departure Time, Arrival Time (Customized Date) */}
//           <div className="grid grid-cols-3 gap-4">
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Date</FieldLabel>
//               <FieldContent >
//                 <label className="relative cursor-pointer">
//                   <input
//                     type="date"
//                     name="date"
//                     value={formState.date}
//                     onChange={handleInputChange}
//                     min={getTodayString()}
//                     className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button appearance-none  hide-date-icon cursor-pointer"
//                   />
//                   <img
//                     src={CalendarIcon}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
//                   />
//                 </label>
//               </FieldContent>
//             </Field>

//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Departure Time</FieldLabel>
//               <FieldContent>
//                 <input
//                   type="time"
//                   name="departureTime"
//                   value={formState.departureTime}
//                   onChange={handleInputChange}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                 />
//               </FieldContent>
//             </Field>

//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Arrival Time</FieldLabel>
//               <FieldContent>
//                 <input
//                   type="time"
//                   name="arrivalTime"
//                   value={formState.arrivalTime}
//                   onChange={handleInputChange}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                 />
//               </FieldContent>
//             </Field>
//           </div>

//           {/* Row 3: Flight Number, Departure Airport, Arrival Airport */}
//           <div className="grid grid-cols-3 gap-4">
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Flight Number</FieldLabel>
//               <FieldContent>
//                 <input
//                   type="text"
//                   name="flightNumber"
//                   value={formState.flightNumber}
//                   onChange={handleInputChange}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
//                 />
//               </FieldContent>
//             </Field>

//             {/* Departure Airport (Searchable Select) */}
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Departure Airport</FieldLabel>
//               <FieldContent className="relative" ref={departureRef}>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   name="departureAirport"
//                   value={formState.departureAirport}
//                   onChange={handleInputChange}
//                   onFocus={() => setShowDepartureOptions(true)}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
//                 />
//                 {showDepartureOptions && (
//                   <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-secondary rounded shadow-lg z-10 max-h-40 overflow-y-auto">
//                     {airportOptions.map((airport: AirportOption) => (
//                       <div
//                         key={airport.code}
//                         onClick={() => {
//                           setFormState(prev => ({ ...prev, departureAirport: airport.code }));
//                           setShowDepartureOptions(false)
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-secondary"
//                       >
//                         {airport.code}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldContent>
//             </Field>

//             {/* Arrival Airport (Searchable Select) */}
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Arrival Airport</FieldLabel>
//               <FieldContent className="relative" ref={arrivalRef}>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   name="arrivalAirport"
//                   value={formState.arrivalAirport}
//                   onChange={handleInputChange}
//                   onFocus={() => setShowArrivalOptions(true)}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
//                 />
//                 {showArrivalOptions && (
//                   <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-secondary rounded shadow-lg z-10 max-h-40 overflow-y-auto">
//                     {airportOptions.map((airport: AirportOption) => (
//                       <div
//                         key={airport.code}
//                         onClick={() => {
//                           setFormState(prev => ({ ...prev, arrivalAirport: airport.code }));
//                           setShowArrivalOptions(false)
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-secondary"
//                       >
//                         {airport.code}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldContent>
//             </Field>
//           </div>

//           {/* Row 4: Aircraft Reg and PAX Count */}
//           <div className="grid grid-cols-3 gap-4">
//             <Field className="col-span-1">
//               <FieldLabel require={true} className="text-sm text-text-secondary ">Aircraft Reg</FieldLabel>
//               <FieldContent>
//                 <select
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
//                   name="aircraftReg"
//                   value={formState.aircraftReg}
//                   onChange={handleInputChange}
//                 >
//                   <option value=""></option>
//                   {aircraftRegOptions.map((reg: Aircraft) => (
//                     <option key={reg.registration} value={reg.registration}>{reg.registration}</option>
//                   ))}
//                 </select>
//               </FieldContent>
//             </Field>

//             <Field className="col-span-2">
//               <FieldLabel className="text-sm text-text-secondary ">PAX Count</FieldLabel>
//               <FieldContent>
//                 <div className="grid grid-cols-4 gap-2">
//                   {[
//                     { label: "Business Studio", key: "businessStudio" as keyof AddFormState['pax'] },
//                     { label: "Business", key: "business" as keyof AddFormState['pax'] },
//                     { label: "Economy", key: "economy" as keyof AddFormState['pax'] },
//                     { label: "Crew", key: "crew" as keyof AddFormState['pax'] },
//                   ].map((type) => (
//                     <div key={type.key} className="flex flex-col items-center">
//                       <input
//                         type="number"
//                         name={`pax.${type.key}`}
//                         value={formState.pax[type.key] === 0 ? '' : formState.pax[type.key]}
//                         onChange={(e) => handlePaxChange(type.key, e.target.value)}
//                         className="w-full border border-border-secondary rounded px-3 py-2 text-center text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
//                         min="0"
//                       />
//                       <span className="text-[0.65rem] text-text-secondary text-center mt-1">
//                         {type.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </FieldContent>
//             </Field>
//           </div>

//           {/* Row 5: Manual toggles (Retaining original toggle style) */}
//           <div className="space-y-3 pt-2">
//             {[
//               { label: "Manual Pairing", checked: formState.manualPairing, name: 'manualPairing' as keyof AddFormState },
//               { label: "Manual Loading Plan Selection", checked: formState.manualLoadingPlanSelection, name: 'manualLoadingPlanSelection' as keyof AddFormState },
//               { label: "Manual Meal Plan Selection", checked: formState.manualMealPlanSelection, name: 'manualMealPlanSelection' as keyof AddFormState },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 className="flex items-center justify-between" >
//                 <label className="text-text-secondary">{item.label}</label>
//                 <div
//                   className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.checked ? "border-green-500" : "border-border-secondary"
//                     }`}
//                   onClick={(e) => {
//                     e.preventDefault()
//                     handleToggleChange(item.name, !item.checked);
//                   }}
//                 >
//                   {item.checked && (
//                     <svg
//                       className={`w-3.5 h-3.5  text-green-500 `}
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Footer Buttons */}
//           <div className="flex justify-end gap-3 pt-4 border-t border-border-secondary">
//             <Button
//               onClick={onClose}
//               className="px-6 py-2 bg-bg-button-gray text-text-secondary rounded hover:bg-gray-200 transition-colors"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => handleSubmit(true)} // Save and Close
//               className={`px-6 py-2 text-white rounded transition-opacity 
//                 ${isLoading ? 'bg-bg-button-gray cursor-not-allowed' : 'bg-bg-button hover:bg-bg-button-hover'} `}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Saving...' : 'Save'}
//             </Button>
//             <Button
//               onClick={() => handleSubmit(false)} // Save and Add Next
//               className={`px-6 py-2 text-white rounded transition-opacity 
//                 ${isLoading ? 'bg-bg-button-gray cursor-not-allowed' : 'bg-bg-button hover:bg-bg-button-hover'} `}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Saving...' : 'Save and Add'}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// import type React from "react"
// import { useState, useRef, useEffect, useCallback } from "react"
// import { useFlightStore } from "../../store/flight";
// import type { AddFlightPayload, AddFormState, AircraftOption, AirlineOption, AirportOption } from "../../types/Flight";
// import {
//   Field,
//   FieldLabel,
//   FieldContent
// } from "../Field";
// import { CalendarIcon } from "../../assets/icons";
// import Button from "../Button";
// import { getTodayString } from "../../lib/utils";

// interface FlightFormData extends AddFormState {
//   id: string; // Unique identifier for each flight in the multi-step
// }

// export const AddFlightModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   const initialFormState: AddFormState = {
//     airlineCode: "",
//     direction: "",
//     flightType: "J",
//     date: "",
//     departureTime: "",
//     arrivalTime: "",
//     flightNumber: "",
//     aircraftReg: "",
//     pax: { businessStudio: 0, business: 0, economy: 0, crew: 0 },
//     manualPairing: false,
//     manualLoadingPlanSelection: false,
//     manualMealPlanSelection: false,
//     departureAirport: "",
//     arrivalAirport: ""
//   };

//   const [currentStep, setCurrentStep] = useState(0);
//   const [flightForms, setFlightForms] = useState<FlightFormData[]>([
//     { ...initialFormState, id: Date.now().toString() }
//   ]);
//   const [showDepartureOptions, setShowDepartureOptions] = useState(false);
//   const [showArrivalOptions, setShowArrivalOptions] = useState(false);
//   const [localError, setLocalError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { addFlight, addBulkFlight, isLoading, error, fetchFlightOptions,
//     airlineCodeOptions,
//     airportOptions,
//     aircraftRegOptions } = useFlightStore();

//   useEffect(() => {
//     fetchFlightOptions();
//   }, [fetchFlightOptions]);

//   const departureRef = useRef<HTMLDivElement | null>(null);
//   const arrivalRef = useRef<HTMLDivElement | null>(null);

//   const currentFormState = flightForms[currentStep];

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFlightForms(prev => {
//       const updated = [...prev];
//       updated[currentStep] = { ...updated[currentStep], [name]: value };
//       return updated;
//     });
//   };

//   const handlePaxChange = (key: keyof AddFormState['pax'], value: string) => {
//     const num = parseInt(value, 10);
//     const numericValue = (!isNaN(num) && num >= 0) ? num : 0;

//     setFlightForms(prev => {
//       const updated = [...prev];
//       updated[currentStep] = {
//         ...updated[currentStep],
//         pax: { ...updated[currentStep].pax, [key]: numericValue }
//       };
//       return updated;
//     });
//   };

//   const handleToggleChange = (name: keyof AddFormState, checked: boolean) => {
//     setFlightForms(prev => {
//       const updated = [...prev];
//       updated[currentStep] = { ...updated[currentStep], [name]: checked };
//       return updated;
//     });
//   };

//   useEffect(() => {
//     function handleOutside(event: Event) {
//       const target = event.target as Node | null;

//       if (departureRef.current && !departureRef.current.contains(target as Node)) {
//         setShowDepartureOptions(false);
//       }

//       if (arrivalRef.current && !arrivalRef.current.contains(target as Node)) {
//         setShowArrivalOptions(false);
//       }
//     }

//     document.addEventListener("mousedown", handleOutside);
//     document.addEventListener("touchstart", handleOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleOutside);
//       document.removeEventListener("touchstart", handleOutside);
//     };
//   }, []);

//   const validateCurrentForm = (): boolean => {
//     setLocalError(null);
//     const form = flightForms[currentStep];

//     const mandatoryFields: (keyof AddFormState)[] = [
//       'date', 'departureTime', 'arrivalTime',
//       'flightNumber', 'departureAirport', 'arrivalAirport',
//       'airlineCode', 'aircraftReg', 'direction'
//     ];

//     const missingField = mandatoryFields.some(key => {
//       const value = form[key];
//       return typeof value === 'string' && value.trim() === '';
//     });

//     if (missingField) {
//       setLocalError("Please fill in all mandatory fields.");
//       return false;
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const selectedDate = new Date(form.date);
//     selectedDate.setHours(0, 0, 0, 0);

//     if (isNaN(selectedDate.getTime()) || selectedDate < today) {
//       setLocalError("Date must be today or a future date.");
//       return false;
//     }

//     return true;
//   };

//   const handleAddAnother = () => {
//     if (!validateCurrentForm()) return;

//     // Add a new form with a unique ID
//     setFlightForms(prev => [
//       ...prev,
//       { ...initialFormState, id: Date.now().toString() }
//     ]);
//     setCurrentStep(flightForms.length);
//     setLocalError(null);
//   };

//   const handleRemoveFlight = (index: number) => {
//     if (flightForms.length === 1) {
//       setLocalError("You must have at least one flight.");
//       return;
//     }

//     setFlightForms(prev => prev.filter((_, i) => i !== index));

//     // Adjust current step if needed
//     if (currentStep >= flightForms.length - 1) {
//       setCurrentStep(Math.max(0, flightForms.length - 2));
//     }
//   };

//   const handleSubmitAll = useCallback(async () => {
//     // Validate current form first
//     if (!validateCurrentForm()) return;

//     setIsSubmitting(true);
//     setLocalError(null);

//     try {
//       // Convert all forms to payloads
//       const payloads: AddFlightPayload[] = flightForms.map(form => {
//         const totalPax = Object.values(form.pax).reduce((sum, count) => sum + count, 0);

//         return {
//           airlineCode: form.airlineCode,
//           direction: form.direction,
//           flightType: form.flightType,
//           date: form.date,
//           departureTime: form.departureTime,
//           arrivalTime: form.arrivalTime,
//           flightNumber: form.flightNumber,
//           departureAirport: form.departureAirport,
//           arrivalAirport: form.arrivalAirport,
//           aircraftReg: form.aircraftReg,
//           paxCount: totalPax,
//           manualPairing: form.manualPairing,
//           manualLoadingPlanSelection: form.manualLoadingPlanSelection,
//           manualMealPlanSelection: form.manualMealPlanSelection,
//         };
//       });

//       // Submit all flights
//       // const promises = payloads.map(payload => addFlight(payload));
//       // await Promise.all(promises);
//       const response = await addBulkFlight(payloads);
//       console.log(response)
//       onClose();
//     } catch (err) {
//       console.error("Failed to submit flights:", err);
//       setLocalError("Failed to submit one or more flights. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [flightForms, addFlight, addBulkFlight, validateCurrentForm, onClose]);

//   const goToStep = (index: number) => {
//     if (index < 0 || index >= flightForms.length) return;
//     setCurrentStep(index);
//     setLocalError(null);
//   };

//   return (
//     <div className="fixed inset-0 font-rubik bg-black/50 flex flex-col items-center justify-center z-50">
//       {/* Modal Header */}
//       <div className="w-full max-w-xl bg-green-600 text-white py-2 rounded-t-lg">
//         <div className="flex items-center justify-between px-4">
//           <h2 className="text-sm font-semibold">Create Mode - Flight {currentStep + 1} of {flightForms.length}</h2>

//           {/* Step indicators */}
//           <div className="flex gap-2">
//             {flightForms.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToStep(index)}
//                 className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${index === currentStep
//                   ? 'bg-white text-green-600'
//                   : 'bg-green-700 text-white hover:bg-green-800'
//                   }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow-lg w-full max-w-xl p-6 rounded-b-lg max-h-[80vh] overflow-y-auto">

//         {/* Error Message Display */}
//         {(localError || error) && (
//           <div className="p-2 mb-4 text-[13px] font-medium text-red bg-red-100 border border-red-400 rounded">
//             {localError || `API Error: ${error}`}
//           </div>
//         )}

//         <div className="space-y-4">

//           {/* Row 1: Airline Code, Direction, Flight Type */}
//           <div className="grid grid-cols-3 gap-4">
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Airline Code</FieldLabel>
//               <FieldContent>
//                 <select
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                   name="airlineCode"
//                   value={currentFormState.airlineCode}
//                   onChange={handleInputChange}
//                 >
//                   <option value=""></option>
//                   {airlineCodeOptions.map((code: AirlineOption) => (
//                     <option key={code.code} value={code.code}>{code.code}</option>
//                   ))}
//                 </select>
//               </FieldContent>
//             </Field>
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Direction</FieldLabel>
//               <FieldContent>
//                 <select
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                   name="direction"
//                   value={currentFormState.direction}
//                   onChange={handleInputChange}
//                 >
//                   <option value=""></option>
//                   <option value="[O/B]">[O/B]</option>
//                   <option value="[I/B]">[I/B]</option>
//                 </select>
//               </FieldContent>
//             </Field>
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Flight Type</FieldLabel>
//               <FieldContent>
//                 <div className="flex items-center gap-4 pt-2">
//                   {["J", "P"].map((type) => (
//                     <label key={type} className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="flightType"
//                         value={type}
//                         checked={currentFormState.flightType === type}
//                         onChange={handleInputChange}
//                         className="w-4 h-4 text-green-600 focus:ring-green-600"
//                       />
//                       <span className="text-text-secondary">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </FieldContent>
//             </Field>
//           </div>

//           {/* Row 2: Date, Departure Time, Arrival Time */}
//           <div className="grid grid-cols-3 gap-4">
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Date</FieldLabel>
//               <FieldContent>
//                 <label className="relative cursor-pointer">
//                   <input
//                     type="date"
//                     name="date"
//                     value={currentFormState.date}
//                     onChange={handleInputChange}
//                     min={getTodayString()}
//                     className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button appearance-none hide-date-icon cursor-pointer"
//                   />
//                   <img
//                     src={CalendarIcon}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
//                   />
//                 </label>
//               </FieldContent>
//             </Field>

//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Departure Time</FieldLabel>
//               <FieldContent>
//                 <input
//                   type="time"
//                   name="departureTime"
//                   value={currentFormState.departureTime}
//                   onChange={handleInputChange}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                 />
//               </FieldContent>
//             </Field>

//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Arrival Time</FieldLabel>
//               <FieldContent>
//                 <input
//                   type="time"
//                   name="arrivalTime"
//                   value={currentFormState.arrivalTime}
//                   onChange={handleInputChange}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                 />
//               </FieldContent>
//             </Field>
//           </div>

//           {/* Row 3: Flight Number, Departure Airport, Arrival Airport */}
//           <div className="grid grid-cols-3 gap-4">
//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Flight Number</FieldLabel>
//               <FieldContent>
//                 <input
//                   type="text"
//                   name="flightNumber"
//                   value={currentFormState.flightNumber}
//                   onChange={handleInputChange}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                 />
//               </FieldContent>
//             </Field>

//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Departure Airport</FieldLabel>
//               <FieldContent className="relative" ref={departureRef}>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   name="departureAirport"
//                   value={currentFormState.departureAirport}
//                   onChange={handleInputChange}
//                   onFocus={() => setShowDepartureOptions(true)}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                 />
//                 {showDepartureOptions && (
//                   <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-secondary rounded shadow-lg z-10 max-h-40 overflow-y-auto">
//                     {airportOptions.map((airport: AirportOption) => (
//                       <div
//                         key={airport.code}
//                         onClick={() => {
//                           setFlightForms(prev => {
//                             const updated = [...prev];
//                             updated[currentStep] = { ...updated[currentStep], departureAirport: airport.code };
//                             return updated;
//                           });
//                           setShowDepartureOptions(false);
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-secondary"
//                       >
//                         {airport.code}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldContent>
//             </Field>

//             <Field>
//               <FieldLabel require={true} className="text-sm text-text-secondary">Arrival Airport</FieldLabel>
//               <FieldContent className="relative" ref={arrivalRef}>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   name="arrivalAirport"
//                   value={currentFormState.arrivalAirport}
//                   onChange={handleInputChange}
//                   onFocus={() => setShowArrivalOptions(true)}
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                 />
//                 {showArrivalOptions && (
//                   <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-secondary rounded shadow-lg z-10 max-h-40 overflow-y-auto">
//                     {airportOptions.map((airport: AirportOption) => (
//                       <div
//                         key={airport.code}
//                         onClick={() => {
//                           setFlightForms(prev => {
//                             const updated = [...prev];
//                             updated[currentStep] = { ...updated[currentStep], arrivalAirport: airport.code };
//                             return updated;
//                           });
//                           setShowArrivalOptions(false);
//                         }}
//                         className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-secondary"
//                       >
//                         {airport.code}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldContent>
//             </Field>
//           </div>

//           {/* Row 4: Aircraft Reg and PAX Count */}
//           <div className="grid grid-cols-3 gap-4">
//             <Field className="col-span-1">
//               <FieldLabel require={true} className="text-sm text-text-secondary">Aircraft Reg</FieldLabel>
//               <FieldContent>
//                 <select
//                   className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                   name="aircraftReg"
//                   value={currentFormState.aircraftReg}
//                   onChange={handleInputChange}
//                 >
//                   <option value=""></option>
//                   {aircraftRegOptions.map((reg: AircraftOption) => (
//                     <option key={reg.registration} value={reg.registration}>{reg.registration}</option>
//                   ))}
//                 </select>
//               </FieldContent>
//             </Field>

//             <Field className="col-span-2">
//               <FieldLabel className="text-sm text-text-secondary">PAX Count</FieldLabel>
//               <FieldContent>
//                 <div className="grid grid-cols-4 gap-2">
//                   {[
//                     { label: "Business Studio", key: "businessStudio" as keyof AddFormState['pax'] },
//                     { label: "Business", key: "business" as keyof AddFormState['pax'] },
//                     { label: "Economy", key: "economy" as keyof AddFormState['pax'] },
//                     { label: "Crew", key: "crew" as keyof AddFormState['pax'] },
//                   ].map((type) => (
//                     <div key={type.key} className="flex flex-col items-center">
//                       <input
//                         type="number"
//                         name={`pax.${type.key}`}
//                         value={currentFormState.pax[type.key] === 0 ? '' : currentFormState.pax[type.key]}
//                         onChange={(e) => handlePaxChange(type.key, e.target.value)}
//                         className="w-full border border-border-secondary rounded px-3 py-2 text-center text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
//                         min="0"
//                       />
//                       <span className="text-[0.65rem] text-text-secondary text-center mt-1">
//                         {type.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </FieldContent>
//             </Field>
//           </div>

//           {/* Row 5: Manual toggles */}
//           <div className="space-y-3 pt-2">
//             {[
//               { label: "Manual Pairing", checked: currentFormState.manualPairing, name: 'manualPairing' as keyof AddFormState },
//               { label: "Manual Loading Plan Selection", checked: currentFormState.manualLoadingPlanSelection, name: 'manualLoadingPlanSelection' as keyof AddFormState },
//               { label: "Manual Meal Plan Selection", checked: currentFormState.manualMealPlanSelection, name: 'manualMealPlanSelection' as keyof AddFormState },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 className="flex items-center justify-between"
//               >
//                 <label className="text-text-secondary">{item.label}</label>
//                 <div
//                   className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${item.checked ? "border-green-500" : "border-border-secondary"
//                     }`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleToggleChange(item.name, !item.checked);
//                   }}
//                 >
//                   {item.checked && (
//                     <svg
//                       className="w-3.5 h-3.5 text-green-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Footer Buttons */}
//           <div className={`flex ${flightForms.length > 1 ? "justify-between" : "justify-end"} items-center pt-4 gap-3 px-4 border-t border-border-secondary`}>
//             {/* Left side - Remove Flight button */}


//             {/* Right side - Action buttons */}
//             {/* <div className="flex gap-3 ml-auto items-center justify-center"> */}
//             {flightForms.length > 1 && (
//               <Button
//                 onClick={() => handleRemoveFlight(currentStep)}
//                 className="px-2 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
//               >
//                 Remove Flight {currentStep + 1}
//               </Button>
//             )}

//             <Button
//               onClick={onClose}
//               className="px-6 py-2 bg-bg-button-gray text-text-secondary rounded hover:bg-gray-200 transition-colors"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleAddAnother}
//               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//               disabled={isLoading || isSubmitting}
//             >
//               Save & Add
//             </Button>
//             <Button
//               onClick={handleSubmitAll}
//               className={`px-6 py-2 text-white rounded transition-opacity ${isLoading || isSubmitting ? 'bg-bg-button-gray cursor-not-allowed' : 'bg-bg-button hover:bg-bg-button-hover'
//                 }`}
//               disabled={isLoading || isSubmitting}
//             >
//               {isSubmitting ? `Saving...` : `Save`}
//             </Button>
//             {/* </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useFlightStore } from "../../store/flight";
import type { AddFlightPayload, AddFormState, AircraftOption, AirlineOption, AirportOption } from "../../types/Flight";
import {
  Field,
  FieldLabel,
  FieldContent
} from "../Field";
import { CalendarIcon } from "../../assets/icons";
import Button from "../Button";
import { getTodayString } from "../../lib/utils";

interface FlightFormData extends AddFormState {
  id: string; // Unique identifier for each flight in the multi-step
}

export const AddFlightModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const initialFormState: AddFormState = {
    airlineCode: "",
    direction: "",
    flightType: "J",
    date: "",
    departureTime: "",
    arrivalTime: "",
    flightNumber: "",
    aircraftReg: "",
    pax: { businessStudio: 0, business: 0, economy: 0, crew: 0 },
    manualPairing: false,
    manualLoadingPlanSelection: false,
    manualMealPlanSelection: false,
    departureAirport: "",
    arrivalAirport: ""
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [flightForms, setFlightForms] = useState<FlightFormData[]>([
    { ...initialFormState, id: Date.now().toString() }
  ]);
  const [showDepartureOptions, setShowDepartureOptions] = useState(false);
  const [showArrivalOptions, setShowArrivalOptions] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addFlight, addBulkFlight, isLoading, error, fetchFlightOptions,
    airlineCodeOptions,
    airportOptions,
    aircraftRegOptions } = useFlightStore();

  useEffect(() => {
    fetchFlightOptions();
  }, [fetchFlightOptions]);

  const departureRef = useRef<HTMLDivElement | null>(null);
  const arrivalRef = useRef<HTMLDivElement | null>(null);

  const currentFormState = flightForms[currentStep];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFlightForms(prev => {
      const updated = [...prev];
      updated[currentStep] = { ...updated[currentStep], [name]: value };
      return updated;
    });
  };

  const handlePaxChange = (key: keyof AddFormState['pax'], value: string) => {
    const num = parseInt(value, 10);
    const numericValue = (!isNaN(num) && num >= 0) ? num : 0;

    setFlightForms(prev => {
      const updated = [...prev];
      updated[currentStep] = {
        ...updated[currentStep],
        pax: { ...updated[currentStep].pax, [key]: numericValue }
      };
      return updated;
    });
  };

  const handleToggleChange = (name: keyof AddFormState, checked: boolean) => {
    setFlightForms(prev => {
      const updated = [...prev];
      updated[currentStep] = { ...updated[currentStep], [name]: checked };
      return updated;
    });
  };

  useEffect(() => {
    function handleOutside(event: Event) {
      const target = event.target as Node | null;

      if (departureRef.current && !departureRef.current.contains(target as Node)) {
        setShowDepartureOptions(false);
      }

      if (arrivalRef.current && !arrivalRef.current.contains(target as Node)) {
        setShowArrivalOptions(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const validateCurrentForm = (): boolean => {
    setLocalError(null);
    const form = flightForms[currentStep];

    const mandatoryFields: (keyof AddFormState)[] = [
      'date', 'departureTime', 'arrivalTime',
      'flightNumber', 'departureAirport', 'arrivalAirport',
      'airlineCode', 'aircraftReg', 'direction'
    ];

    const missingField = mandatoryFields.some(key => {
      const value = form[key];
      return typeof value === 'string' && value.trim() === '';
    });

    if (missingField) {
      setLocalError("Please fill in all mandatory fields.");
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(form.date);
    selectedDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      setLocalError("Date must be today or a future date.");
      return false;
    }

    return true;
  };

  const handleAddAnother = () => {
    if (!validateCurrentForm()) return;

    // Add a new form with a unique ID
    setFlightForms(prev => [
      ...prev,
      { ...initialFormState, id: Date.now().toString() }
    ]);
    setCurrentStep(flightForms.length);
    setLocalError(null);
  };

  const handleRemoveFlight = (index: number) => {
    if (flightForms.length === 1) {
      setLocalError("You must have at least one flight.");
      return;
    }

    setFlightForms(prev => prev.filter((_, i) => i !== index));

    // Adjust current step if needed
    if (currentStep >= flightForms.length - 1) {
      setCurrentStep(Math.max(0, flightForms.length - 2));
    }
  };

  const handleSubmitAll = useCallback(async () => {
    // Validate current form first
    if (!validateCurrentForm()) return;

    setIsSubmitting(true);
    setLocalError(null);

    try {
      // Check if single or multiple flights
      if (flightForms.length === 1) {
        // Single flight - call addFlight with single object
        const form = flightForms[0];
        const payload: AddFlightPayload = {
          airlineCode: form.airlineCode,
          direction: form.direction,
          flightType: form.flightType,
          date: form.date,
          departureTime: form.departureTime,
          arrivalTime: form.arrivalTime,
          flightNumber: form.flightNumber,
          departureAirport: form.departureAirport,
          arrivalAirport: form.arrivalAirport,
          aircraftReg: form.aircraftReg,
          businessStudioCount: form.pax.businessStudio,
          businessCount: form.pax.business,
          economyCount: form.pax.economy,
          crewCount: form.pax.crew,
          manualPairing: form.manualPairing,
          manualLoadingPlanSelection: form.manualLoadingPlanSelection,
          manualMealPlanSelection: form.manualMealPlanSelection,
        };

        await addFlight(payload);
      } else {
        // Multiple flights - call addBulkFlight with array
        const payloads: AddFlightPayload[] = flightForms.map((form, index) => ({
          airlineCode: form.airlineCode,
          direction: form.direction,
          flightType: form.flightType,
          date: form.date,
          departureTime: form.departureTime,
          arrivalTime: form.arrivalTime,
          flightNumber: form.flightNumber,
          departureAirport: form.departureAirport,
          arrivalAirport: form.arrivalAirport,
          aircraftReg: form.aircraftReg,
          businessStudioCount: form.pax.businessStudio,
          businessCount: form.pax.business,
          economyCount: form.pax.economy,
          crewCount: form.pax.crew,
          isPrimary: index === 0, // First flight is primary
          manualPairing: form.manualPairing,
          manualLoadingPlanSelection: form.manualLoadingPlanSelection,
          manualMealPlanSelection: form.manualMealPlanSelection,
        }));

        await addBulkFlight(payloads);
      }

      // Close modal on success
      onClose();
    } catch (err) {
      console.error("Failed to submit flights:", err);
      setLocalError("Failed to submit flights. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [flightForms, addFlight, addBulkFlight, onClose]);

  const goToStep = (index: number) => {
    if (index < 0 || index >= flightForms.length) return;
    setCurrentStep(index);
    setLocalError(null);
  };

  return (
    <div className="fixed inset-0 font-rubik bg-black/50 flex flex-col items-center justify-center z-50">
      {/* Modal Header */}
      <div className="w-full max-w-xl bg-green-600 text-white py-2 rounded-t-lg">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-sm font-semibold">Create Mode - Flight {currentStep + 1} of {flightForms.length}</h2>

          {/* Step indicators */}
          <div className="flex gap-2">
            {flightForms.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${index === currentStep
                  ? 'bg-white text-green-600'
                  : 'bg-green-700 text-white hover:bg-green-800'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg w-full max-w-xl p-6 rounded-b-lg max-h-[80vh] overflow-y-auto">

        {/* Error Message Display */}
        {(localError || error) && (
          <div className="p-2 mb-4 text-[13px] font-medium text-red bg-red-100 border border-red-400 rounded">
            {localError || `API Error: ${error}`}
          </div>
        )}

        <div className="space-y-4">

          {/* Row 1: Airline Code, Direction, Flight Type */}
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Airline Code</FieldLabel>
              <FieldContent>
                <select
                  className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                  name="airlineCode"
                  value={currentFormState.airlineCode}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  {airlineCodeOptions.map((code: AirlineOption) => (
                    <option key={code.code} value={code.code}>{code.code}</option>
                  ))}
                </select>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Direction</FieldLabel>
              <FieldContent>
                <select
                  className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                  name="direction"
                  value={currentFormState.direction}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  <option value="[O/B]">[O/B]</option>
                  <option value="[I/B]">[I/B]</option>
                </select>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Flight Type</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-4 pt-2">
                  {["J", "P"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="flightType"
                        value={type}
                        checked={currentFormState.flightType === type}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 focus:ring-green-600"
                      />
                      <span className="text-text-secondary">{type}</span>
                    </label>
                  ))}
                </div>
              </FieldContent>
            </Field>
          </div>

          {/* Row 2: Date, Departure Time, Arrival Time */}
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Date</FieldLabel>
              <FieldContent>
                <label className="relative cursor-pointer">
                  <input
                    type="date"
                    name="date"
                    value={currentFormState.date}
                    onChange={handleInputChange}
                    min={getTodayString()}
                    className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button appearance-none hide-date-icon cursor-pointer"
                  />
                  <img
                    src={CalendarIcon}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                  />
                </label>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Departure Time</FieldLabel>
              <FieldContent>
                <input
                  type="time"
                  name="departureTime"
                  value={currentFormState.departureTime}
                  onChange={handleInputChange}
                  className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Arrival Time</FieldLabel>
              <FieldContent>
                <input
                  type="time"
                  name="arrivalTime"
                  value={currentFormState.arrivalTime}
                  onChange={handleInputChange}
                  className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                />
              </FieldContent>
            </Field>
          </div>

          {/* Row 3: Flight Number, Departure Airport, Arrival Airport */}
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Flight Number</FieldLabel>
              <FieldContent>
                <input
                  type="text"
                  name="flightNumber"
                  value={currentFormState.flightNumber}
                  onChange={handleInputChange}
                  className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Departure Airport</FieldLabel>
              <FieldContent className="relative" ref={departureRef}>
                <input
                  type="text"
                  placeholder="Search..."
                  name="departureAirport"
                  value={currentFormState.departureAirport}
                  onChange={handleInputChange}
                  onFocus={() => setShowDepartureOptions(true)}
                  className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                />
                {showDepartureOptions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-secondary rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                    {airportOptions.map((airport: AirportOption) => (
                      <div
                        key={airport.code}
                        onClick={() => {
                          setFlightForms(prev => {
                            const updated = [...prev];
                            updated[currentStep] = { ...updated[currentStep], departureAirport: airport.code };
                            return updated;
                          });
                          setShowDepartureOptions(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-secondary"
                      >
                        {airport.code}
                      </div>
                    ))}
                  </div>
                )}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel require={true} className="text-sm text-text-secondary">Arrival Airport</FieldLabel>
              <FieldContent className="relative" ref={arrivalRef}>
                <input
                  type="text"
                  placeholder="Search..."
                  name="arrivalAirport"
                  value={currentFormState.arrivalAirport}
                  onChange={handleInputChange}
                  onFocus={() => setShowArrivalOptions(true)}
                  className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                />
                {showArrivalOptions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-secondary rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                    {airportOptions.map((airport: AirportOption) => (
                      <div
                        key={airport.code}
                        onClick={() => {
                          setFlightForms(prev => {
                            const updated = [...prev];
                            updated[currentStep] = { ...updated[currentStep], arrivalAirport: airport.code };
                            return updated;
                          });
                          setShowArrivalOptions(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-secondary"
                      >
                        {airport.code}
                      </div>
                    ))}
                  </div>
                )}
              </FieldContent>
            </Field>
          </div>

          {/* Row 4: Aircraft Reg and PAX Count */}
          <div className="grid grid-cols-3 gap-4">
            <Field className="col-span-1">
              <FieldLabel require={true} className="text-sm text-text-secondary">Aircraft Reg</FieldLabel>
              <FieldContent>
                <select
                  className="w-full border border-border-secondary rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                  name="aircraftReg"
                  value={currentFormState.aircraftReg}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  {aircraftRegOptions.map((reg: AircraftOption) => (
                    <option key={reg.registration} value={reg.registration}>{reg.registration}</option>
                  ))}
                </select>
              </FieldContent>
            </Field>

            <Field className="col-span-2">
              <FieldLabel className="text-sm text-text-secondary">PAX Count</FieldLabel>
              <FieldContent>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Business Studio", key: "businessStudio" as keyof AddFormState['pax'] },
                    { label: "Business", key: "business" as keyof AddFormState['pax'] },
                    { label: "Economy", key: "economy" as keyof AddFormState['pax'] },
                    { label: "Crew", key: "crew" as keyof AddFormState['pax'] },
                  ].map((type) => (
                    <div key={type.key} className="flex flex-col items-center">
                      <input
                        type="number"
                        name={`pax.${type.key}`}
                        value={currentFormState.pax[type.key] === 0 ? '' : currentFormState.pax[type.key]}
                        onChange={(e) => handlePaxChange(type.key, e.target.value)}
                        className="w-full border border-border-secondary rounded px-3 py-2 text-center text-text-secondary bg-bg-surface focus:outline-none focus:border-bg-button"
                        min="0"
                      />
                      <span className="text-[0.65rem] text-text-secondary text-center mt-1">
                        {type.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FieldContent>
            </Field>
          </div>

          {/* Row 5: Manual toggles */}
          <div className="space-y-3 pt-2">
            {[
              { label: "Manual Pairing", checked: currentFormState.manualPairing, name: 'manualPairing' as keyof AddFormState },
              { label: "Manual Loading Plan Selection", checked: currentFormState.manualLoadingPlanSelection, name: 'manualLoadingPlanSelection' as keyof AddFormState },
              { label: "Manual Meal Plan Selection", checked: currentFormState.manualMealPlanSelection, name: 'manualMealPlanSelection' as keyof AddFormState },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <label className="text-text-secondary">{item.label}</label>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${item.checked ? "border-green-500" : "border-border-secondary"
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleChange(item.name, !item.checked);
                  }}
                >
                  {item.checked && (
                    <svg
                      className="w-3.5 h-3.5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-border-secondary">
            {/* Left side - Remove Flight button */}
            {flightForms.length > 1 && (
              <Button
                onClick={() => handleRemoveFlight(currentStep)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
              >
                Remove Flight {currentStep + 1}
              </Button>
            )}

            {/* Right side - Action buttons */}
            <div className="flex gap-3 ml-auto">
              <Button
                onClick={onClose}
                className="px-6 py-2 bg-bg-button-gray text-text-secondary rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddAnother}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                disabled={isLoading || isSubmitting}
              >
                Save & Add
              </Button>
              <Button
                onClick={handleSubmitAll}
                className={`px-6 py-2 text-white rounded transition-opacity ${isLoading || isSubmitting ? 'bg-bg-button-gray cursor-not-allowed' : 'bg-bg-button hover:bg-bg-button-hover'
                  }`}
                disabled={isLoading || isSubmitting}
              >
                {isSubmitting ? `Saving...` : `Save`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};