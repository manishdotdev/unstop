import { useState } from "react";

const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const MoneyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#6366f1" : "none"} stroke={filled ? "#6366f1" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

const Tag = ({ icon, label }) => (
  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 whitespace-nowrap">
    {icon}
    {label}
  </span>
);

function getInitials(name) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

const logoColors = [
  { bg: "bg-slate-100", text: "text-slate-600" },
  { bg: "bg-blue-50",   text: "text-blue-600"  },
  { bg: "bg-indigo-50", text: "text-indigo-600" },
  { bg: "bg-slate-100", text: "text-slate-600"  },
  { bg: "bg-blue-50",   text: "text-blue-600"   },
];

function CompanyLogo({ logo, name, idx }) {
  const color = logoColors[idx % logoColors.length];
  if (logo) return <img src={logo} alt={name} className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-200 p-1" />;
  return (
    <div className={`w-10 h-10 rounded-xl ${color.bg} ${color.text} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
      {getInitials(name)}
    </div>
  );
}

function InternshipCard({ item, idx }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 w-full">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CompanyLogo logo={item.logo} name={item.company} idx={idx} />
          <span className="text-sm font-semibold text-slate-700">{item.company}</span>
        </div>
        {item.isNew && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200">
            New
          </span>
        )}
      </div>

      <div className="border-t border-slate-100" />

      <h4 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h4>

      <div className="flex flex-wrap gap-2">
        <Tag icon={<MapPinIcon />} label={item.location} />
        <Tag icon={<BriefcaseIcon />} label={item.type} />
        <Tag icon={<CalendarIcon />} label={item.duration} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Tag icon={<MoneyIcon />} label={item.stipend} />
        {item.shift && <Tag icon={<ClockIcon />} label={item.shift} />}
      </div>

      <div className="border-t border-slate-100" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50 transition-all duration-150">
            <MessageIcon />
          </button>
          <button
            onClick={() => setSaved(s => !s)}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-150 ${saved
              ? "border-indigo-300 bg-indigo-50 text-indigo-500"
              : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50"
              }`}
          >
            <StarIcon filled={saved} />
          </button>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors duration-150 shadow-sm">
          Apply
        </button>
      </div>

    </div>
  );
}

const internships = [
  { title: "Human Resources (HR)", company: "Edlernity", logo: null, location: "Remote", type: "Internship", stipend: "₹4K–11.2K", duration: "2 Months", shift: "Flexible", isNew: true },
  { title: "Human Resources (HR)", company: "Mintifi Finserve", logo: null, location: "Mumbai", type: "Full-Time", stipend: "₹10K–15K/mo", duration: "6 Months", shift: null, isNew: false },
  { title: "Content & Social Media Marketing", company: "Phenom People", logo: "https://internshala-uploads.internshala.com/logo%2Fd8due9qdxly-8614.png.webp", location: "Hyderabad", type: "Internship", stipend: "₹15K–20K/mo", duration: "3 Months", shift: "Day Shift", isNew: true },
  { title: "Video Editing/Making", company: "91 Trucks", logo: null, location: "Gurgaon", type: "Part-Time", stipend: "₹10K–15K/mo", duration: "2 Months", shift: "Evening", isNew: false },
  // { title: "Marketing", company: "University Of Essex", logo: "https://internshala-uploads.internshala.com/logo%2F5e2fdf09bbc171580195593.jpg.webp", location: "Delhi (Hybrid)", type: "Internship", stipend: "₹25K/mo", duration: "3 Months", shift: "Morning", isNew: true },
];

export default function App() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-8 sm:mb-10 group">
        <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Trending</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Internships</h3>
        <p className="text-sm text-slate-500 mt-1.5">Discover internships from startups and top companies tailored for students.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {internships.map((item, idx) => (
          <InternshipCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </div>
  );
}