import { type FC } from "react";
import { StatusRow } from "../StatusRow";
import img1 from "../../assets/icons/preparations_details/image 192.png";
import img2 from "../../assets/icons/preparations_details/Frame 1000008128.png";
import galaryLogo from "../../assets/icons/preparations_details/GalleryLogo.svg";

import ToogleSwitch from "../ToggleButton";

interface FlightPreparationModalProps {
  open: boolean;
  onClose: () => void;
}

export const FlightPreparationDetailsModal: FC<FlightPreparationModalProps> = ({
  onClose,
}) => {
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
