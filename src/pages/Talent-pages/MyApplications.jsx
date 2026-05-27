import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import {
  MapPin, Clock, Banknote, CheckCircle2, XCircle, Hourglass,
  ArrowLeft, ChevronRight, MessageCircle, ExternalLink, Briefcase
} from "lucide-react";

const statusConfig = {
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  pending: {
    label: "Pending",
    icon: Hourglass,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
};

function ApplicationCard({ application }) {
  const navigate = useNavigate();
  const StatusIcon = statusConfig[application.status]?.icon || Hourglass;
  const statusStyle = statusConfig[application.status] || statusConfig.pending;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Status bar */}
      <div className={`h-1.5 bg-gradient-to-r ${
        application.status === "approved" 
          ? "from-emerald-500 to-teal-500"
          : application.status === "rejected"
          ? "from-rose-500 to-pink-500"
          : "from-amber-500 to-yellow-500"
      }`} />
      
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left: Logo and details */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm p-2">
              <img src={application.logo} alt={application.company} className="w-full h-full object-contain" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-[18px] font-bold text-slate-900 leading-tight mb-1">
                {application.positionTitle}
              </h3>
              <p className="text-[15px] font-medium text-indigo-600 mb-3">{application.company}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-[13px] text-slate-600">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {application.location}
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  {application.duration}
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                  <Banknote size={14} />
                  {application.stipend || application.salary}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Status badge */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full ${statusStyle.bg} ${statusStyle.border} border`}>
            <StatusIcon size={14} className={statusStyle.color} />
            <span className={`text-[12px] font-semibold ${statusStyle.color}`}>
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Applied date and action */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-[13px] text-slate-500">
            Applied on <span className="font-medium text-slate-700">{formatDate(application.appliedDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            {application.status === "approved" && application.recruiter && (
              <button
                onClick={() => navigate(`/my-applications/${application.id}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-[12px] font-semibold hover:bg-indigo-100 transition-colors"
              >
                <MessageCircle size={14} />
                Contact Recruiter
              </button>
            )}
            <button
              onClick={() => navigate(`/my-applications/${application.id}`)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-[12px] font-semibold hover:bg-slate-100 transition-colors"
            >
              <ExternalLink size={14} />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyApplications() {
  const navigate = useNavigate();
  const { applications } = useUser();

  const approvedApps = applications.filter(app => app.status === "approved");
  const pendingApps = applications.filter(app => app.status === "pending");
  const rejectedApps = applications.filter(app => app.status === "rejected");

  return (
    <div
      className="min-h-screen pb-20 lg:pb-0"
      style={{
        background: "linear-gradient(135deg, #dce8f8 0%, #eef1fb 60%, #dde8f5 100%)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-slate-400 font-medium">
          <button onClick={() => navigate("/")} className="hover:text-indigo-600 transition-colors">Home</button>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-semibold">My Applications</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-4"
          >
            <ArrowLeft size={15} /> Back to Home
          </button>
          
          <h1 className="text-[28px] font-black text-slate-900" style={{ letterSpacing: "-0.025em" }}>
            My Applications
          </h1>
          <p className="text-[14px] text-slate-500 mt-1">
            Track all your internship and job applications in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[24px] font-bold text-slate-900">{approvedApps.length}</p>
                <p className="text-[12px] text-slate-500 font-medium">Approved</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Hourglass size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-[24px] font-bold text-slate-900">{pendingApps.length}</p>
                <p className="text-[12px] text-slate-500 font-medium">Pending</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                <XCircle size={24} className="text-rose-600" />
              </div>
              <div>
                <p className="text-[24px] font-bold text-slate-900">{rejectedApps.length}</p>
                <p className="text-[12px] text-slate-500 font-medium">Rejected</p>
              </div>
            </div>
          </div>
        </div>

{/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <Briefcase size={40} className="text-slate-300" />
            </div>
            <h3 className="text-[18px] font-bold text-slate-700 mb-2">No Applications Yet</h3>
            <p className="text-[14px] text-slate-500 mb-6">
              You haven't applied to any opportunities yet. Start exploring internships and jobs!
            </p>
            <button
              onClick={() => navigate("/internship")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Browse Internships
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}