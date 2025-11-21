// interface DrawerItem { qty: number; item: string; }
// interface DrawerData { [key: number]: DrawerItem[]; }

interface FlightPreparationModalProps {
  open: boolean;
  onClose: () => void;
}

import {
  // useState, 
  type FC
} from "react";
import { StatusRow } from "../StatusRow";
import img1 from "../../assets/icons/preparations_details/image 192.png";
import img2 from "../../assets/icons/preparations_details/Frame 1000008128.png";
import galaryLogo from "../../assets/icons/preparations_details/GalleryLogo.svg";


import ToogleSwitch from "../ToggleButton";
// import { Canvas } from "@react-three/fiber";
// import { DrawerCart, Lighting } from "./3D-Drawer";
// import { OrbitControls } from "@react-three/drei";

interface FlightPreparationModalProps {
  open: boolean;
  onClose: () => void;
}

export const FlightPreparationDetailsModal: FC<FlightPreparationModalProps> = ({
  onClose,
}) => {
  // const [selectedDrawer, setSelectedDrawer] = useState<number>(3);
  // const drawerCount = 3; // Fixed at 3 for this visualization

  // // Sample drawer data
  // const drawerData: DrawerData = {
  //   1: [
  //     { qty: 2, item: "Coffee Cups" },
  //     { qty: 5, item: "Tea Bags" }
  //   ],
  //   2: [
  //     { qty: 3, item: "Sugar Packets" },
  //     { qty: 1, item: "Milk Container" }
  //   ],
  //   3: [
  //     { qty: 1, item: "DRAWER LINER 10\" X 14 1/2\" ATLAS" },
  //     { qty: 3, item: "White Wine Montenero 187ml eco" },
  //     { qty: 1, item: "Red Wine Montenero 187ml eco" }
  //   ]
  // };

  // const handleDrawerSelect = (drawerNumber: number) => {
  //   // Toggles the drawer: if the same drawer is clicked, close it (set to 0), otherwise open the new one.
  //   setSelectedDrawer(prev => (prev === drawerNumber ? 0 : drawerNumber));
  // };

  // const currentDrawerItems: DrawerItem[] | undefined = drawerData[selectedDrawer];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.4)] backdrop-blur-sm font-rubik">
      <div className="w-full max-w-7xl bg-bg-surface rounded-3xl shadow-xl p-6 text-text-primary relative">
        {/* Header */}
        <header className="border-b border-border-muted pb-4">
          <h2 className="text-xl font-medium text-text-muted">
            Flight Preparation Plan Details
          </h2>
          <div className="flex flex-wrap font-rubik gap-4 mt-6">
            <div>
              <span className="text-text-tertiary text-sm font-normal">
                Stowage:{" "}
              </span>
              <span className="font-medium text-base text-text-secondary">
                1202
              </span>
            </div>
            <div>
              <span className="text-text-tertiary text-sm font-normal">
                Carrier:{" "}
              </span>
              <span className="font-medium text-base text-text-secondary">
                Purser Kit
              </span>
            </div>
            <div>
              <span className="text-text-tertiary text-sm font-normal">
                Equipment:{" "}
              </span>
              <span className="font-medium text-base text-text-secondary">
                Canister Small Square Atlas
              </span>
            </div>
          </div>
        </header>

        <StatusRow />

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6 mt-6 bg-bg-secondary">
          {/* Left: Galley + Cart */}
          <div className="col-span-3 md:col-span-2 rounded-2xl p-4">
            <div className="flex justify-between mt-4">
              <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-normal text-text-secondary ms-10">
                    Position in Galley
                  </h3>
                </div>
                <img src={img1} alt="Galley" className="h-108 object-contain" />
              </div>
              {/* 3D Cart Section - Layout Fixes Applied Here */}
              {/* <div className="w-full md:w-1/2 flex flex-col justify-start h-[350px] pl-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-base font-normal text-gray-700 ms-2">
                    Ultralight bluedart
                  </h3>
                </div>

                <div className="w-full grow rounded-lg overflow-hidden shadow-inner">
                  <Canvas
                    camera={{ position: [-5, 2, 8], fov: 50 }}
                    shadows
                    gl={{ antialias: true }}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <Lighting />
                    <DrawerCart
                      drawerCount={drawerCount}
                      selectedDrawer={selectedDrawer}
                      onDrawerSelect={handleDrawerSelect}
                    />

                    <OrbitControls
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      minPolarAngle={Math.PI / 4}
                      maxPolarAngle={Math.PI / 2}
                    />
                  </Canvas>
                </div>
              </div> */}
              <div className="w-full md:w-1/2 flex flex-col justify-between items-stretch h-[350px]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-normal text-text-secondary ms-10">
                    Ultralight bluedart
                  </h3>
                </div>
                <img
                  src={img2}
                  alt="Double Cart"
                  className="h-64 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right: Drawer Details */}
          {/* <div className="col-span-1">
            <label className="flex items-center justify-end m-4 text-sm text-text-tertiary gap-2">
              <span>Loose Items</span>
              <ToogleSwitch />
            </label>
            <div className="border bg-bg-surface border-border-muted rounded-2xl flex flex-col h-4/5">
              <div className="flex justify-start gap-3 items-center mb-3 px-4 pt-4">
                <span className="text-base text-text-tertiary">Selected:</span>
                <span className="font-normal text-text-primary">Drawer 3</span>
              </div>

              <table className="w-full text-xs border-t border-border-muted">
                <thead className="text-text-tertiary bg-bg-secondary border-b border-border-muted">
                  <tr>
                    <th className="p-4 text-left w-10 font-medium text-text-primary">
                      Qty.
                    </th>
                    <th className="p-4 text-left font-medium text-text-primary">
                      Item
                    </th>
                    <th className="p-4 text-right font-medium text-text-primary">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="[&>tr>td]:p-4 [&>tr>td]:align-middle text-text-muted text-sm">
                  {selectedDrawer > 0 && currentDrawerItems && currentDrawerItems.length > 0 ? (
                    currentDrawerItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="text-center">{item.qty}</td>
                        <td>{item.item}</td>
                        <td className="text-right">
                          <svg className="inline h-4 w-4 text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center p-4 text-gray-400">
                        {selectedDrawer === 0 ? "Select a drawer to view items." : "Invalid drawer selection."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <button className="mt-auto bg-bg-secondary hover:bg-bg-primary rounded-xl py-2 font-normal text-text-secondary mx-6 mb-3">
                Add Image
              </button>
            </div>
          </div> */}
          <div className="col-span-1">
            <label className="flex items-center justify-end m-4 text-sm text-text-tertiary gap-2">
              <span>Loose Items</span>
              <ToogleSwitch />
            </label>
            <div className="border bg-bg-surface border-border-muted rounded-2xl flex flex-col h-4/5">
              <div className="flex justify-start gap-3 items-center mb-3 px-4 pt-4">
                <span className="text-base text-text-tertiary">Selected:</span>
                <span className="font-normal text-text-primary">Drawer 3</span>
              </div>

              <table className="w-full text-xs border-t border-border-muted">
                <thead className="text-text-tertiary bg-bg-secondary border-b border-border-muted">
                  <tr>
                    <th className="p-4 text-left w-10 font-medium text-text-primary">
                      Qty.
                    </th>
                    <th className="p-4 text-left font-medium text-text-primary">
                      Item
                    </th>
                    <th className="p-4 text-right font-medium text-text-primary">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="[&>tr>td]:p-4 [&>tr>td]:align-middle text-text-muted text-sm">
                  <tr className="border-b border-border-muted">
                    <td className="text-center">1</td>
                    <td>DRAWER LINER 10” X 14 1/2” ATLAS</td>
                    <td className="">
                      <img src={galaryLogo} alt="icon" className="inline h-4" />
                    </td>
                  </tr>
                  <tr className="border-b border-border-muted">
                    <td className="text-center">3</td>
                    <td>White Wine Montenero 187ml eco</td>
                    <td className="">
                      <img src={galaryLogo} alt="icon" className="inline h-4" />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">1</td>
                    <td>Red Wine Montenero 187ml eco</td>
                    <td className="">
                      <img src={galaryLogo} alt="icon" className="inline h-4" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <button className="mt-auto bg-bg-secondary hover:bg-bg-primary rounded-xl py-2 font-normal text-text-secondary mx-6 mb-3">
                Add Image
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="border border-border-muted rounded-xl px-10 py-2 font-regular text-text-secondary hover:bg-bg-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
