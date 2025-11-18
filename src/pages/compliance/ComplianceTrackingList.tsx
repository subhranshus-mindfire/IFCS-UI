import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ArrowLeft, Plus, ChevronDown, Image } from "lucide-react";
import { useState } from "react";
import AddIssueModal from "./AddIssueModal";

const ComplianceTrackingList = () => {
  const { cityName } = useParams();
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false);


  type Status = "New" | "Read";

  const statusMapping: Record<Status, string> = {
    New: "bg-red-300",
    Read: "bg-blue-200",
  };

  const data = [
    {
      flight: "EK712",
      dir: "A330-800",
      cat: "Quality",
      status: "Read",
      date: "Jul 11, 2025",
      by: "Nitin Vishnoi",
      subject: "N Test 11th",
      hasImage: "Yes"
    },
    {
      flight: "EK713",
      dir: "A330-880",
      cat: "Quality",
      status: "Read",
      date: "Jul 11, 2025",
      by: "Nitin Vishnoi",
      subject: "N Test 11th.1",
      hasImage: "Yes"
    },
    {
      flight: "EK712",
      dir: "A330-880",
      cat: "Quality",
      status: "Read",
      date: "Jul 11, 2025",
      by: "Nitin Vishnoi",
      subject: "N Test 11th.2",
      hasImage: "Yes"
    },
    {
      flight: "EK712",
      dir: "A330-880",
      cat: "Quality",
      status: "Read",
      date: "Jul 11, 2025",
      by: "Nitin Vishnoi",
      subject: "N test food quality",
      hasImage: "Yes"
    },
    {
      flight: "EK712",
      dir: "A330-880",
      cat: "Quality",
      status: "Read",
      date: "Jul 10, 2025",
      by: "Nitin Vishnoi",
      subject: "N Test New Task",
      hasImage: "No"
    },
    {
      flight: "EK705",
      dir: "A330-800",
      cat: "Quality",
      status: "New",
      date: "Jul 11, 2025",
      by: "Nitin Vishnoi",
      subject: "N test",
      hasImage: "Yes"
    },
    {
      flight: "YUO",
      dir: "Test",
      cat: "Delays",
      status: "Read",
      date: "Jul 16, 2025",
      by: "mindfire",
      subject: "Test",
      hasImage: "No"
    },
  ]

  return (
    <div className="p-6 font-rubik">
      {/* Breadcrumb */}
      <div className="flex items-center text-text-secondary text-sm gap-2">
        <ArrowLeft size={28} className="cursor-pointer" onClick={() => navigate(-1)} />
        <span className="pt-1">Compliance Tracking</span>
        <ChevronRight className="pt-1" size={14} />
        <span className="font-normal text-gray-700 pt-1">Station - {cityName}</span>
      </div>

      {/* Header Row */}
      <div className="flex justify-between items-center mt-6 text-text-secondary">
        <div className="text-2xl font-normal">Station: {cityName}
          <span className="text-text-muted text-base">&ensp;(7 Issues)</span>
        </div>

        <div className="flex items-center gap-4">
          {/* New Issue button */}
          <button className="flex items-center gap-1 bg-bg-tertiary px-3 py-1.5 rounded-lg hover:bg-gray-200" onClick={() => setModalOpen(true)}>
            <Plus size={14} />
            <span>New Issue</span>
          </button>

          {/* Search dropdown */}
          <button className="flex items-center gap-1 bg-bg-tertiary px-3 py-1.5 rounded-lg hover:bg-gray-200">
            <span>Search</span>
            <ChevronDown size={16} />
          </button>

          {/* Duration dropdown */}
          <button className="flex items-center gap-1 bg-bg-tertiary px-3 py-1.5 rounded-lg hover:bg-gray-200">
            <span>Duration</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 w-full border border-bg-secondary rounded-2xl overflow-hidden">
        <table className="w-full text-sm border border-bg-secondary">
          <thead className="bg-gray-50 text-text-secondary">
            <tr className="bg-bg-tertiary border border-bg-secondary font-thin">
              <th className="py-3 text-left"></th>
              <th className="py-3 px-4 text-left">Flight #</th>
              <th className="py-3 px-4 text-left">Flight Director</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Submitted By</th>
              <th className="py-3 px-4 text-left">Subject</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y text-text-muted">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 border border-bg-secondary">
                <td className=" py-3 flex justify-end">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-300">
                    <div className={`w-5 h-5 rounded-full ${statusMapping[row.status as Status]}`}></div>
                  </div>
                </td>
                <td className="px-4 py-3">{row.flight}</td>
                <td className="px-4 py-3">{row.dir}</td>
                <td className="px-4 py-3">{row.cat}</td>
                <td className="px-4 py-3">{row.status}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.by}</td>
                <td className="px-4 py-3">{row.subject}</td>
                <td className="px-4 py-3 text-right flex items-center gap-5 justify-end">
                  {row.hasImage === "Yes" ? <Image width={20}></Image> : <></>}
                  <ChevronRight size={18} className="text-purple-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen == true ? <AddIssueModal onClose={() => setModalOpen(false)} /> : <></>}

    </div>
  );
};

export default ComplianceTrackingList;
