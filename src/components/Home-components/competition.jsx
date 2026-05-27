import { useState } from "react";

const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="7" y="2" width="10" height="9" rx="1"/>
  </svg>
);

const TagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59z"/>
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#6366f1" : "none"} stroke={filled ? "#6366f1" : "currentColor"} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M4 4h16v16H4z"/>
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
  "bg-slate-100 text-slate-600",
  "bg-blue-50 text-blue-600",
  "bg-indigo-50 text-indigo-600",
  "bg-slate-100 text-slate-600",
  "bg-blue-50 text-blue-600",
];

function CompanyLogo({ logo, name, idx }) {

  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-200 p-1"
      />
    );
  }

  return (
    <div className={`w-10 h-10 rounded-xl ${logoColors[idx % 5]} flex items-center justify-center text-sm font-bold`}>
      {getInitials(name)}
    </div>
  );
}

function CompetitionCard({ item, idx }) {

  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <CompanyLogo logo={item.logo} name={item.org} idx={idx}/>
          <span className="text-sm font-semibold text-slate-700">{item.org}</span>
        </div>
        {item.isNew && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200 flex-shrink-0">
            New
          </span>
        )}
      </div>

      <div className="border-t border-slate-100 mb-3"/>

      {/* Title — fixed min-height so all cards align below it */}
      <h4 className="text-base font-bold text-slate-900 leading-snug mb-3 min-h-[48px]">
        {item.title}
      </h4>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        <Tag icon={<MapPinIcon />} label={item.location}/>
        <Tag icon={<TagIcon />} label={item.type}/>
        <Tag icon={<CalendarIcon />} label={item.deadline}/>
      </div>

      {/* Prize — always takes up space, hidden when absent */}
      <div className="mb-3 min-h-[32px] flex items-center">
        {item.prize ? (
          <Tag icon={<TrophyIcon />} label={item.prize}/>
        ) : null}
      </div>

      <div className="border-t border-slate-100 mb-3"/>

      {/* Footer — always at bottom */}
      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={() => setSaved(s => !s)}
          className="text-sm text-slate-400 hover:text-indigo-500 transition-colors"
        >
          <StarIcon filled={saved}/>
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition-colors">
          Register
        </button>
      </div>

    </div>
  );
}


const competitions = [
  {
    title: "Meraki 2026 Business Plan Competition",
    org: "FIIB Delhi",
    location: "New Delhi",
    prize: "₹6,00,000",
    type: "Business",
    deadline: "Mar '26",
    logo: null,
    isNew: true
  },
  {
    title: "Quadra Clash",
    org: "Cummins College",
    location: "Pune",
    prize: null,
    type: "Engineering",
    deadline: "Apr '26",
    logo: null,
    isNew: false
  },
  {
    title: "Quest Arena Animation Game",
    org: "St Peters Engineering College",
    location: "Telangana",
    prize: null,
    type: "Design",
    deadline: "Mar '26",
    logo: null,
    isNew: true
  },
  {
    title: "Structural Showdown",
    org: "Cummins College",
    location: "Pune",
    prize: "₹27,000",
    type: "Engineering",
    deadline: "May '26",
    logo: null,
    isNew: false
  }
];


export default function CompetitionsSection() {

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">

      <div className="mb-8 sm:mb-10">
        <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Trending</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Competitions</h3>
        <p className="text-sm text-slate-500 mt-1.5">Participate in competitions from universities and organizations worldwide.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {competitions.map((item, idx) => (
          <CompetitionCard key={idx} item={item} idx={idx}/>
        ))}
      </div>

    </div>
  );
}