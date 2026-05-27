import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import {
  MapPin, Clock, Banknote, CheckCircle2, XCircle, Hourglass,
  ArrowLeft, ChevronRight, MessageCircle,Briefcase, Building2, Send, User, Calendar, Mail, Phone, ExternalLink
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
    label: "Under Review",
    icon: Hourglass,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  rejected: {
    label: "Not Selected",
    icon: XCircle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
};

function ContentCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-[15px] font-black text-slate-900" style={{ letterSpacing: "-0.01em" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export default function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications } = useUser();
  const [message, setMessage] = useState("");

  const application = applications.find(app => app.id === parseInt(id));

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h3 className="text-[18px] font-bold text-slate-700 mb-2">Application Not Found</h3>
          <p className="text-[14px] text-slate-500 mb-4">ID: {id}, Total: {applications.length}</p>
          <button
            onClick={() => navigate("/my-applications")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[application.status]?.icon || Hourglass;
  const statusStyle = statusConfig[application.status] || statusConfig.pending;

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
          <button onClick={() => navigate("/my-applications")} className="hover:text-indigo-600 transition-colors">My Applications</button>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-semibold truncate max-w-[200px]">{application.positionTitle}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* Back button */}
        <button
          onClick={() => navigate("/my-applications")}
          className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors w-fit"
        >
          <ArrowLeft size={15} /> Back to Applications
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className={`h-1.5 bg-gradient-to-r ${
            application.status === "approved" 
              ? "from-emerald-500 via-teal-500 to-cyan-500"
              : application.status === "rejected"
              ? "from-rose-500 via-pink-500 to-red-500"
              : "from-amber-500 via-yellow-500 to-orange-500"
          }`} />
          <div className="p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              {/* Logo + Title */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm p-2">
                  <img src={application.logo} alt={application.company} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-[22px] sm:text-[24px] font-black text-slate-900 leading-tight" style={{ letterSpacing: "-0.025em" }}>
                    {application.positionTitle}
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[14px] font-bold text-indigo-600">{application.company}</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-[13px] text-slate-500 font-medium">
                      <MapPin size={12} className="text-slate-400" />
                      {application.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.border} border`}>
                <StatusIcon size={16} className={statusStyle.color} />
                <span className={`text-[13px] font-semibold ${statusStyle.color}`}>
                  {statusStyle.label}
                </span>
              </div>
            </div>

            {/* Meta Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 border-t border-slate-100">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1 text-emerald-500">
                  <Banknote size={13} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compensation</span>
                </div>
                <p className="text-[13px] font-bold text-slate-800">{application.stipend || application.salary || "Negotiable"}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1 text-blue-500">
                  <Clock size={13} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Duration</span>
                </div>
                <p className="text-[13px] font-bold text-slate-800">{application.duration}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1 text-violet-500">
                  <Calendar size={13} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Applied On</span>
                </div>
                <p className="text-[13px] font-bold text-slate-800">{formatDate(application.appliedDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Left Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* About the position */}
            <ContentCard title="About this opportunity" icon={<Briefcase size={15} className="text-indigo-500" />}>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                {application.positionType === "internship" 
                  ? `Join ${application.company}'s team as an intern and work on real products. You'll collaborate with experienced professionals to build and ship features.`
                  : `Position at ${application.company} offering valuable experience in your field.`}
              </p>
            </ContentCard>

            {/* About the company */}
            <ContentCard title={`About ${application.company}`} icon={<Building2 size={15} className="text-blue-500" />}>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                {application.company} is a leading company in its industry, known for innovation and excellence. 
                They offer exceptional opportunities for growth and learning.
              </p>
            </ContentCard>

            {/* Messaging Section - Only visible for approved applications */}
            {application.status === "approved" && application.recruiter && (
              <ContentCard title="Messages" icon={<MessageCircle size={15} className="text-emerald-500" />}>
                <div className="flex flex-col gap-4">
                  {/* Messages list */}
                  <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                    {application.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.sender === "recruiter" && (
                          <img
                            src={application.recruiter.avatar}
                            alt={application.recruiter.name}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                          />
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                            msg.sender === "user"
                              ? "bg-indigo-500 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <p className="text-[13px] leading-relaxed">{msg.message}</p>
                          <p className={`text-[10px] mt-1.5 ${
                            msg.sender === "user" ? "text-indigo-200" : "text-slate-400"
                          }`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                        {msg.sender === "user" && (
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                            <User size={16} className="text-slate-500" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-indigo-300"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </ContentCard>
            )}

            {/* Status timeline for non-approved */}
            {application.status !== "approved" && (
              <ContentCard title="Application Status" icon={<Hourglass size={15} className="text-amber-500" />}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <div>
                      <p className="text-[13px] font-medium text-slate-700">Application Submitted</p>
                      <p className="text-[11px] text-slate-400">{formatDate(application.appliedDate)}</p>
                    </div>
                  </div>
                  
                  {application.status === "pending" && (
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                      <div>
                        <p className="text-[13px] font-medium text-slate-500">Under Review</p>
                        <p className="text-[11px] text-slate-400">Waiting for recruiter response</p>
                      </div>
                    </div>
                  )}

                  {application.status === "rejected" && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <div>
                        <p className="text-[13px] font-medium text-slate-700">{statusConfig.rejected.label}</p>
                        <p className="text-[11px] text-slate-400">{formatDate(application.statusUpdated)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </ContentCard>
            )}

            {/* Feedback for rejected */}
            {application.status === "rejected" && application.messages.length > 0 && (
              <ContentCard title="Feedback from Recruiter" icon={<XCircle size={15} className="text-rose-500" />}>
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                  <p className="text-[13px] text-slate-700 leading-relaxed">
                    {application.messages[application.messages.length - 1]?.message || "No feedback provided."}
                  </p>
                </div>
              </ContentCard>
            )}
          </div>

          {/* Right Sticky Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
            {/* Recruiter Card - Only for approved */}
            {application.status === "approved" && application.recruiter && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Your Recruiter</p>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={application.recruiter.avatar}
                    alt={application.recruiter.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[14px] font-bold text-slate-800">{application.recruiter.name}</p>
                    <p className="text-[12px] text-slate-500">{application.recruiter.title}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[12px] text-slate-600">
                    <Mail size={12} className="text-slate-400" />
                    {application.recruiter.email}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-slate-600">
                    <Phone size={12} className="text-slate-400" />
                    {application.recruiter.phone}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate(`/internshipdetail/${application.positionId}`)}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-[12px] font-medium hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink size={14} />
                  View Opportunity
                </button>
                <button
                  onClick={() => navigate("/internship")}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-[12px] font-medium hover:bg-slate-100 transition-colors"
                >
                  <ChevronRight size={14} />
                  Browse Similar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}