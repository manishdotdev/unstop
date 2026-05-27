import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApplication } from "../../hooks/useApplication";
import {
  MapPin, Clock, Briefcase, Banknote, Users, Calendar, Bookmark, Share2,
  Building2, CheckCircle2, Award, Zap, ChevronRight, BookmarkX,
  ExternalLink, Copy, X, ArrowLeft, Star, Sparkles, Heart,
  Loader2, Check
} from "lucide-react";

// ─── JOB DATA (mirrors Jobs.jsx) ─────────────────────────────────────────────
const jobsData = [
  {
    id: 1,
    title: "Digital Marketing Executive",
    company: "Morecare Mobility & Rehabilitation Solutions",
    experience: "No prior experience required",
    type: "Full Time",
    location: "In Office | Jaipur",
    salary: "₹20K – 25K/Month",
    openings: 5,
    applyBy: "15 Jun 2026",
    postedDate: "Feb 25, 2026",
    daysLeft: 13,
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/699e862e995ed_organisation_image-KkCndSDM55179984988E5XaVjnosS.png",
    skills: ["Marketing Analytics", "Pay-Per-Click (PPC) Advertising", "Social Media Management", "Google Ads", "SEO"],
    categories: ["Digital Marketing", "Fresher"],
    about: "We are looking for a Digital Marketing Executive to join our growing team. You will be responsible for planning and executing digital marketing campaigns across multiple channels including social media, email, and paid advertising.",
    responsibilities: [
      "Plan and execute digital marketing campaigns across SEO, SEM, email, and social media",
      "Measure and report performance of all digital marketing campaigns against goals",
      "Identify trends and insights, and optimize spend and performance based on the insights",
      "Collaborate with internal teams to create landing pages and optimize user experience",
    ],
    whoCanApply: [
      "Available for full-time (in-office) role",
      "Can join immediately or within 30 days",
      "Have relevant skills and interests in digital marketing",
      "Comfortable working in a fast-paced startup environment",
    ],
    perks: ["Health Insurance", "Performance Bonus", "5 days a week", "Learning Budget"],
    aboutCompany: "Morecare Mobility is a leading provider of rehabilitation solutions in India, dedicated to improving the quality of life for people with mobility challenges. We combine technology and compassion to deliver world-class products.",
    activity: ["Hiring since January 2026", "12 opportunities posted"],
    trending: true,
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Google",
    experience: "1–3 years",
    type: "Full Time",
    location: "Remote",
    salary: "₹80K – 1.2L/Month",
    openings: 3,
    applyBy: "20 Jun 2026",
    postedDate: "May 20, 2026",
    daysLeft: 20,
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    skills: ["React", "TypeScript", "Tailwind CSS", "GraphQL", "Jest"],
    categories: ["Developer", "Remote"],
    about: "Join Google's frontend engineering team to build world-class web experiences used by billions of people. You'll work on cutting-edge projects with a team of talented engineers.",
    responsibilities: [
      "Build and maintain high-performance, accessible web applications using React and TypeScript",
      "Collaborate with designers and backend engineers to deliver end-to-end features",
      "Write clean, well-tested code and participate in code reviews",
      "Contribute to improving frontend architecture and developer tooling",
    ],
    whoCanApply: [
      "1–3 years of professional frontend development experience",
      "Strong proficiency in React and TypeScript",
      "Experience with testing frameworks like Jest or Cypress",
      "Excellent communication skills and ability to work in a distributed team",
    ],
    perks: ["Stock Options (RSUs)", "Remote Work", "Health & Dental Insurance", "Annual Learning Stipend", "Home Office Budget"],
    aboutCompany: "Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and artificial intelligence.",
    activity: ["Hiring since March 2026", "45 opportunities posted"],
    trending: true,
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Microsoft",
    experience: "3–5 years",
    type: "Full Time",
    location: "Hybrid | Bengaluru",
    salary: "₹1.5L – 2L/Month",
    openings: 2,
    applyBy: "25 Jun 2026",
    postedDate: "May 18, 2026",
    daysLeft: 18,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    skills: ["Product Strategy", "Agile", "Roadmapping", "Stakeholder Management", "Data Analysis"],
    categories: ["Product", "Corporate"],
    about: "We are seeking an experienced Product Manager to drive the vision and execution of our enterprise software products. You will work closely with engineering, design, and business teams to deliver impactful solutions.",
    responsibilities: [
      "Define product vision, strategy, and roadmap aligned with business goals",
      "Gather and prioritize product and customer requirements",
      "Work closely with engineering teams to deliver features on time",
      "Analyze product metrics and user feedback to drive continuous improvement",
    ],
    whoCanApply: [
      "3–5 years of product management experience in a tech company",
      "Strong analytical and problem-solving skills",
      "Experience with Agile/Scrum methodologies",
      "Excellent written and verbal communication skills",
    ],
    perks: ["Stock Options", "Hybrid Work", "Comprehensive Health Benefits", "Relocation Assistance", "Annual Bonus"],
    aboutCompany: "Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, personal computers, and related services.",
    activity: ["Hiring since February 2026", "28 opportunities posted"],
    trending: false,
  },
];

const skillColors = [
  "bg-violet-50 text-violet-700 border-violet-200",
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-indigo-50 text-indigo-700 border-indigo-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
];

const perkColors = [
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-teal-50 text-teal-700 border-teal-200",
  "bg-cyan-50 text-cyan-700 border-cyan-200",
  "bg-sky-50 text-sky-700 border-sky-200",
  "bg-blue-50 text-blue-700 border-blue-200",
];

function ContentCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-[15px] font-black text-slate-900" style={{ letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function JobDetail() {
   const { id } = useParams();
   const navigate = useNavigate();
   const { handleSingleClickApply, isSubmitting, submitError } = useApplication();
   const [saved, setSaved] = useState(false);
   const [liked, setLiked] = useState(false);
   const [shareOpen, setShareOpen] = useState(false);
   const [copied, setCopied] = useState(false);

  const job = jobsData.find(j => j.id === parseInt(id)) || jobsData[0];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen pb-20 lg:pb-0"
      style={{ background: "linear-gradient(135deg, #dce8f8 0%, #eef1fb 60%, #dde8f5 100%)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-slate-400 font-medium">
          <button onClick={() => navigate("/")} className="hover:text-indigo-600 transition-colors">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate("/jobs")} className="hover:text-indigo-600 transition-colors">Jobs</button>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-semibold truncate max-w-[200px]">{job.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-5">

        {/* Back button */}
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors w-fit"
        >
          <ArrowLeft size={15} /> Back to Jobs
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400" />
          <div className="p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              {/* Logo + Title */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm p-2">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-[24px] font-black text-slate-900 leading-tight" style={{ letterSpacing: "-0.025em" }}>
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[14px] font-bold text-indigo-600">{job.company}</span>
                    <ExternalLink size={12} className="text-indigo-400" />
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-[13px] text-slate-500 font-medium">
                      <MapPin size={12} className="text-slate-400" />{job.location}
                    </span>
                  </div>
                </div>
              </div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {job.trending && (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
                    <Sparkles size={11} /> Trending
                  </span>
                )}
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
                  {job.type}
                </span>
              </div>
            </div>

            {/* Meta Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 border-t border-slate-100">
              {[
                { icon: <Briefcase size={13} />, label: "Experience", value: job.experience, color: "text-violet-500" },
                { icon: <Clock size={13} />, label: "Job Type", value: job.type, color: "text-blue-500" },
                { icon: <Banknote size={13} />, label: "Salary", value: job.salary, color: "text-emerald-500" },
                { icon: <BookmarkX size={13} />, label: "Apply By", value: job.applyBy, color: "text-rose-500" },
                { icon: <Users size={13} />, label: "Openings", value: `${job.openings} positions`, color: "text-amber-500" },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className={`flex items-center gap-1 ${m.color}`}>
                    {m.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{m.label}</span>
                  </div>
                  <p className="text-[13px] font-bold text-slate-800">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* Left Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            <ContentCard title="About the role" icon={<Briefcase size={15} className="text-indigo-500" />}>
              <p className="text-[14px] text-slate-600 leading-relaxed">{job.about}</p>
            </ContentCard>

            <ContentCard title="Key responsibilities" icon={<CheckCircle2 size={15} className="text-emerald-500" />}>
              <div className="flex flex-col gap-2.5">
                {job.responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-black text-emerald-600">{i + 1}</span>
                    </div>
                    <p className="text-[13px] text-slate-700 leading-snug font-medium">{r}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Skills required" icon={<Award size={15} className="text-violet-500" />}>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s, i) => (
                  <span key={i} className={`px-3 py-1.5 text-[12px] font-semibold rounded-xl border ${skillColors[i % skillColors.length]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Who can apply" icon={<Users size={15} className="text-blue-500" />}>
              <p className="text-[12px] text-slate-400 font-semibold mb-3">Only those candidates can apply who:</p>
              <div className="flex flex-col gap-2.5">
                {job.whoCanApply.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <p className="text-[13px] text-slate-700 leading-snug font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Perks & Benefits" icon={<Zap size={15} className="text-amber-500" />}>
              <div className="flex flex-wrap gap-2">
                {job.perks.map((p, i) => (
                  <span key={i} className={`px-3 py-1.5 text-[12px] font-semibold rounded-xl border ${perkColors[i % perkColors.length]}`}>
                    {p}
                  </span>
                ))}
              </div>
            </ContentCard>

            <ContentCard title={`About ${job.company}`} icon={<Building2 size={15} className="text-blue-500" />}>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-5">{job.aboutCompany}</p>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Activity on platform</p>
                <div className="flex flex-col gap-2">
                  {job.activity.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </ContentCard>

             {/* Bottom Apply */}
             <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex items-center justify-between gap-4">
               <div>
                 <p className="text-[14px] font-bold text-slate-800">Ready to apply?</p>
                 <p className="text-[12px] text-slate-400 mt-0.5">Deadline: {job.applyBy}</p>
               </div>
                <button
                  onClick={() => {
                    const appData = handleSingleClickApply(job);
                    if (appData) {
                      navigate("/application-preview", {
                        state: { previewData: appData }
                      });
                    }
                  }}
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 text-[14px] font-bold px-7 py-3 rounded-2xl transition-all shadow-sm lg:pl-6 ${isSubmitting || submitError ? "bg-slate-400 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-200"}`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Loader2 size={20} className="mr-2 h-4 w-4 animate-spin" />
                      <span>Applying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check size={20} className="mr-2 h-4 w-4" />
                      <span>Apply now</span>
                    </div>
                  )}
                </button>
             </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="hidden lg:flex flex-col gap-4 w-[268px] flex-shrink-0 sticky top-6">

            {/* Apply CTA */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2.5 rounded-2xl">
                  <Zap size={13} className="text-amber-500 flex-shrink-0" />
                  <p className="text-[12px] font-bold text-amber-700">Be an early applicant</p>
                </div>
                  <button
                    onClick={() => {
                      const appData = handleSingleClickApply(job);
                      if (appData) {
                        navigate("/application-preview", {
                          state: { previewData: appData }
                        });
                      }
                    }}
                    className={`w-full px-5 text-[14px] font-bold py-3 rounded-2xl transition-all shadow-sm ${isSubmitting || submitError ? "bg-slate-400 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-200"} flex items-center gap-2`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 size={20} className="mr-2 h-4 w-4 animate-spin" />
                        <span>Applying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Check size={20} className="mr-2 h-4 w-4" />
                        <span>Apply now</span>
                      </div>
                    )}
                  </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSaved(s => !s)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[12px] font-semibold transition-all ${saved ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-500"}`}
                  >
                    <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
                    {saved ? "Saved" : "Save"}
                  </button>
                  <div className="relative flex-1">
                    <button
                      onClick={() => setShareOpen(s => !s)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-500 text-[12px] font-semibold transition-all"
                    >
                      <Share2 size={13} /> Share
                    </button>
                    {shareOpen && (
                      <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-2xl z-30 overflow-hidden w-48">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                          <span className="text-[12px] font-bold text-slate-700">Share via</span>
                          <button onClick={() => setShareOpen(false)}><X size={13} className="text-slate-400" /></button>
                        </div>
                        {[
                          { label: "WhatsApp", color: "text-green-600" },
                          { label: "LinkedIn", color: "text-blue-700" },
                          { label: "Twitter / X", color: "text-sky-500" },
                        ].map((item, i) => (
                          <button key={i} className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold hover:bg-slate-50 transition-colors ${item.color}`}>
                            {item.label}
                          </button>
                        ))}
                        <button onClick={handleCopy} className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 border-t border-slate-100">
                          <Copy size={12} /> {copied ? "Copied!" : "Copy link"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 text-center">Apply before <span className="font-bold text-slate-600">{job.applyBy}</span></p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Info</p>
              <div className="flex flex-col gap-3.5">
                {[
                  { icon: <MapPin size={13} />, label: "Location", value: job.location, color: "text-blue-400" },
                  { icon: <Briefcase size={13} />, label: "Experience", value: job.experience, color: "text-violet-400" },
                  { icon: <Banknote size={13} />, label: "Salary", value: job.salary, color: "text-emerald-400" },
                  { icon: <BookmarkX size={13} />, label: "Apply by", value: job.applyBy, color: "text-rose-400" },
                  { icon: <Users size={13} />, label: "Openings", value: `${job.openings} positions`, color: "text-amber-400" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <div className={`flex items-center gap-1.5 ${row.color} flex-shrink-0`}>
                      {row.icon}
                      <span className="text-[11px] font-semibold text-slate-400">{row.label}</span>
                    </div>
                    <span className="text-[12px] font-bold text-slate-700 text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((s, i) => (
                  <span key={i} className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border ${skillColors[i % skillColors.length]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Similar Jobs</p>
              <div className="flex flex-col gap-3">
                {jobsData.filter(j => j.id !== job.id).slice(0, 3).map((j, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/jobdetail/${j.id}`)}
                    className="flex items-center gap-3 text-left hover:bg-slate-50 rounded-xl p-2 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white flex-shrink-0 p-1">
                      <img src={j.logo} alt={j.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-slate-800 leading-snug line-clamp-1">{j.title}</p>
                      <p className="text-[11px] text-slate-400">{j.company}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Sticky Apply Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-800 truncate">{job.title}</p>
          <p className="text-[11px] text-slate-400">Apply by {job.applyBy}</p>
        </div>
        <button
          onClick={() => setSaved(s => !s)}
          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-[12px] font-semibold transition-all flex-shrink-0 ${saved ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "border-slate-200 bg-slate-50 text-slate-500"}`}
        >
          <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </button>
          <button
            onClick={() => {
              const appData = handleSingleClickApply(job);
              if (appData) {
                navigate("/application-preview", {
                  state: { previewData: appData }
                });
              }
            }}
            className={`text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex-shrink-0 flex items-center gap-2 ${isSubmitting || submitError ? "bg-slate-400" : "bg-indigo-500 hover:bg-indigo-600 text-white"}`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 size={20} className="mr-2 h-4 w-4 animate-spin" />
                <span>Applying...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Check size={20} className="mr-2 h-4 w-4" />
                <span>Apply now</span>
              </div>
            )}
          </button>
      </div>
    </div>
  );
}
