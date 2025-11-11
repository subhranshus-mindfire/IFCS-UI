import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ComplianceTrackingDetails = () => {
 const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"flight" | "read">("flight");
  const [discussionTab, setDiscussionTab] = useState<"internal" | "fd" | "comments">("internal");
  const [isFlightDetailsExpanded, setIsFlightDetailsExpanded] = useState(true);
  const [isDiscussionsExpanded, setIsDiscussionsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-bg-tertiary">
      {/* Header with Back Button and Action Buttons */}
      <div className="bg-bg-surface border-b border-border-muted p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-text-secondary hover:text-text-primary transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary text-text-secondary rounded-md hover:bg-gray-300 transition-colors">
              <span className="text-xl">+</span>
              <span className="text-sm">New Issue</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary text-text-secondary rounded-md hover:bg-gray-300 transition-colors">
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
              <span className="text-sm">Edit Issue</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary text-text-secondary rounded-md hover:bg-gray-300 transition-colors">
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
              <span className="text-sm">Flight Report</span>
            </button>
            <button className="px-4 py-2 bg-bg-button text-white rounded-md hover:bg-button-hover transition-colors">
              <span className="text-sm">Close Issue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Flight Details Section */}
        <div className="bg-bg-surface rounded-lg shadow-sm mb-4">
          {/* Flight Details Header with Tabs */}
          <div className="border-b border-border-muted">
            <div className="flex items-center gap-4 px-6 py-4">
              <button
                onClick={() => setIsFlightDetailsExpanded(!isFlightDetailsExpanded)}
                className="text-text-primary"
              >
                <FontAwesomeIcon
                  icon={isFlightDetailsExpanded ? faChevronDown : faChevronRight}
                  className="w-4 h-4"
                />
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab("flight")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "flight"
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Flight Details
                </button>
                <button
                  onClick={() => setActiveTab("read")}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTab === "read"
                      ? "bg-bg-accent text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Read
                </button>
              </div>
            </div>
          </div>

          {/* Flight Details Content */}
          {isFlightDetailsExpanded && (
            <div className="px-6 py-6">
              <div className="grid grid-cols-4 gap-6 mb-8">
                {/* Flight # */}
                <div>
                  <div className="text-text-tertiary text-sm mb-2">Flight #</div>
                  <div className="text-text-primary font-medium">446</div>
                </div>

                {/* Date */}
                <div>
                  <div className="text-text-tertiary text-sm mb-2">Date</div>
                  <div className="text-text-primary font-medium">Feb 18, 2023</div>
                </div>

                {/* Flight Director */}
                <div>
                  <div className="text-text-tertiary text-sm mb-2">Flight Director</div>
                  <div className="text-text-primary font-medium">RAMCHURREETOO BILL VEERASING</div>
                </div>

                {/* Attachments */}
                <div>
                  <div className="text-text-tertiary text-sm mb-2">Attachments</div>
                  <div className="relative">
                    <img
                      src="/placeholder-attachment.jpg"
                      alt="Attachment"
                      className="w-20 h-20 object-cover rounded border border-border-muted"
                    />
                    <button className="absolute top-1 right-1 w-6 h-6 bg-bg-surface rounded-full shadow-md flex items-center justify-center hover:bg-bg-secondary transition-colors">
                      <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-text-secondary" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Category */}
                <div>
                  <div className="text-text-tertiary text-sm mb-2">Category</div>
                  <div className="text-text-primary font-medium">Unclassified</div>
                </div>

                {/* Flight Registration */}
                <div>
                  <div className="text-text-tertiary text-sm mb-2">Flight Registration</div>
                  <div className="text-text-primary font-medium">C-GEZO - A321</div>
                </div>

                {/* Station */}
                <div>
                  <div className="text-text-tertiary text-sm mb-2">Station</div>
                  <div className="text-text-primary font-medium">YQB</div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* ITEM */}
                <div>
                  <div className="text-text-secondary text-sm mb-2 font-medium">ITEM (document single item)</div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-text-primary">-</span>
                    <span className="text-text-primary">DAIRY AND ICE</span>
                  </div>
                </div>

                {/* DAIRY AND ICE */}
                <div className="pl-4">
                  <div className="text-text-secondary text-sm mb-2 font-medium">DAIRY AND ICE</div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-text-primary">-</span>
                    <span className="text-text-primary">CREAMERS</span>
                  </div>
                </div>

                {/* WHO IDENTIFIED THE ISSUE */}
                <div>
                  <div className="text-text-secondary text-sm mb-2 font-medium">WHO IDENTIFIED THE ISSUE</div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-text-primary">-</span>
                    <span className="text-text-primary">CREW</span>
                  </div>
                </div>

                {/* WAS THE FOOD SERVED */}
                <div>
                  <div className="text-text-secondary text-sm mb-2 font-medium">WAS THE FOOD SERVED</div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-text-primary">-</span>
                    <span className="text-text-primary">NO</span>
                  </div>
                </div>

                {/* WHAT WAS THE ISSUE */}
                <div>
                  <div className="text-text-secondary text-sm mb-2 font-medium">WHAT WAS THE ISSUE</div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-text-primary">-</span>
                    <span className="text-text-primary">NA</span>
                  </div>
                </div>

                {/* PHOTO */}
                <div>
                  <div className="text-text-secondary text-sm mb-2 font-medium">PHOTO</div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-text-primary">-</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Discussions Section */}
        <div className="bg-bg-surface rounded-lg shadow-sm">
          {/* Discussions Header */}
          <div className="border-b border-border-muted">
            <div className="flex items-center gap-4 px-6 py-4">
              <button
                onClick={() => setIsDiscussionsExpanded(!isDiscussionsExpanded)}
                className="text-text-primary"
              >
                <FontAwesomeIcon
                  icon={isDiscussionsExpanded ? faChevronDown : faChevronRight}
                  className="w-4 h-4"
                />
              </button>
              <h2 className="text-text-primary font-medium">Discussions</h2>
            </div>
          </div>

          {/* Discussions Content */}
          {isDiscussionsExpanded && (
            <div className="p-6">
              {/* Discussion Tabs */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setDiscussionTab("internal")}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                    discussionTab === "internal"
                      ? "bg-text-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Internal Discussion
                </button>
                <button
                  onClick={() => setDiscussionTab("fd")}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                    discussionTab === "fd"
                      ? "bg-text-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Discuss with FD
                </button>
                <button
                  onClick={() => setDiscussionTab("comments")}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                    discussionTab === "comments"
                      ? "bg-text-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Comments
                </button>
              </div>

              {/* Discussion Content Area */}
              <div className="min-h-[200px] mb-6">
                {/* Empty state for now */}
              </div>

              {/* Message Input */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium">
                  J
                </div>
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-border-muted rounded-full focus:outline-none focus:border-border-accent"
                />
                <button className="px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors">
                  send
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-right">
          <a href="#" className="text-sm text-bg-button hover:underline">
            Shitanshu | 10/11/2025 4:17:51 PM | ifcs-dev.soliant.cloud
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTrackingDetails;
