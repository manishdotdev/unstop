import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mentors } from "../../data/mentorsData";
import { Search, SlidersHorizontal, X, Star, Bookmark, ChevronDown, ArrowRight } from "lucide-react";
import {
  FaFileAlt,
  FaGraduationCap,
  FaTrophy,
  FaBriefcase,
  FaMicrophone,
  FaRocket,
  FaUserTie,
  FaGlobe,
  FaCode,
} from "react-icons/fa";

const categories = [
  { title: "CV Review", color: "blue", icon: FaFileAlt },
  { title: "MBA Preparation", color: "purple", icon: FaGraduationCap },
  { title: "Case Competition", color: "indigo", icon: FaTrophy },
  { title: "Placement Support", color: "orange", icon: FaBriefcase },
  { title: "Interview Preparation", color: "blue", icon: FaMicrophone },
  { title: "Career Guidance", color: "purple", icon: FaRocket },
  { title: "Personal Branding", color: "indigo", icon: FaUserTie },
  { title: "Study Abroad", color: "orange", icon: FaGlobe },
  { title: "Coding & Software", color: "blue", icon: FaCode },
];

const priceOptions = ["Free", "Under ₹1,000", "₹1,000 - ₹2,000", "Above ₹2,000"];
const experienceOptions = ["Fresher", "Professional", "Top Rated"];

const matchColor = (score) => {
  if (score >= 4.5) return { text: "text-emerald-600", stars: "text-emerald-400" };
  if (score >= 4.0) return { text: "text-indigo-600", stars: "text-indigo-400" };
  return { text: "text-amber-600", stars: "text-amber-400" };
};

function MentorCard({ mentor }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const mc = matchColor(mentor.rating);

  const colorThemes = {
    green: { border: "border-green-600", banner: "from-green-100 to-green-300" },
    blue: { border: "border-blue-600", banner: "from-blue-100 to-blue-300" },
    purple: { border: "border-purple-600", banner: "from-purple-100 to-purple-300" },
    pink: { border: "border-pink-600", banner: "from-pink-100 to-pink-300" },
    indigo: { border: "border-indigo-600", banner: "from-indigo-100 to-indigo-300" },
    orange: { border: "border-orange-600", banner: "from-orange-100 to-orange-300" },
  };

  const theme = colorThemes[mentor.color] || colorThemes.blue;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex gap-3">
          <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 p-2 shadow-sm">
            <img src={mentor.photo} alt={mentor.name} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">{mentor.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[13px] text-slate-600">{mentor.title}</span>
              <span className="text-[13px] text-slate-400">·</span>
              <span className="text-[13px] text-slate-600">{mentor.company}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className={`text-[12px] font-semibold ${mc.text}`}>{mentor.rating}</span>
              <span className="text-[11px] text-slate-400">({mentor.reviews})</span>
              {mentor.isTopMentor && (
                <span className="ml-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full">
                  Top Mentor
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 flex-shrink-0"
        >
          <Bookmark size={14} fill={saved ? "currentColor" : "none"} className={saved ? "text-indigo-500" : ""} />
        </button>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {mentor.skills.map((s, i) => (
          <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
            {s}
          </span>
        ))}
      </div>

      {/* Price & Domains */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          {mentor.price}
        </span>
        <div className="flex flex-wrap gap-1">
          {mentor.domains.slice(0, 2).map((d, i) => (
            <span key={i} className="text-[11px] text-slate-500">{d}{i < 1 && mentor.domains.length > 2 ? "," : ""}</span>
          ))}
          {mentor.domains.length > 2 && <span className="text-[11px] text-slate-500">+{(mentor.domains.length - 2)}</span>}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-[11px] text-slate-400">Experience: {mentor.experience.split("|")[0]?.trim()}</span>
        <button
          onClick={() => navigate(`/mentordetail/${mentor.id}`)}
          className="flex items-center gap-1 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 transition"
        >
          View Profile <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

function SidebarFilters({ checkedCategories, setCheckedCategories, checkedPrice, setCheckedPrice, checkedExperience, setCheckedExperience, onClear }) {
  const toggle = (val, set, list) => set(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
  const activeCount = checkedPrice.length + checkedCategories.length + checkedExperience.length;

  const CheckRow = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group/item py-1">
      <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${checked ? "bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-200" : "border-slate-300 group-hover/item:border-indigo-400 bg-white"}`}>
        {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className={`text-[13px] transition-colors font-medium ${checked ? "text-indigo-600" : "text-slate-600 group-hover/item:text-slate-900"}`}>{label}</span>
    </label>
  );

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-indigo-500" />
          <span className="font-bold text-slate-900 text-[14px]" style={{ letterSpacing: "-0.01em" }}>Filters</span>
          {activeCount > 0 && <span className="text-[11px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">{activeCount}</span>}
        </div>
        {activeCount > 0 && (
          <button onClick={onClear} className="text-[12px] text-indigo-500 hover:text-indigo-700 font-semibold flex items-center gap-1">
            <X size={11} /> Clear
          </button>
        )}
      </div>
      <div className="border-t border-slate-100" />

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</p>
        {categories.map((c, i) => (
          <CheckRow key={i} label={c.title} checked={checkedCategories.includes(c.title)} onChange={() => toggle(c.title, setCheckedCategories, checkedCategories)} />
        ))}
      </div>
      <div className="border-t border-slate-100" />

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Price</p>
        {priceOptions.map((p, i) => (
          <CheckRow key={i} label={p} checked={checkedPrice.includes(p)} onChange={() => toggle(p, setCheckedPrice, checkedPrice)} />
        ))}
      </div>
      <div className="border-t border-slate-100" />

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Experience</p>
        {experienceOptions.map((e, i) => (
          <CheckRow key={i} label={e} checked={checkedExperience.includes(e)} onChange={() => toggle(e, setCheckedExperience, checkedExperience)} />
        ))}
      </div>
    </div>
  );
}

function CategoryChip({ title, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative min-w-[130px] h-[100px] rounded-3xl flex flex-col justify-between text-center p-[14px_10px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex-shrink-0 ${active ? "ring-2 ring-indigo-400 shadow-md" : ""}`}
      style={{ background: "linear-gradient(104.37deg, #E9F4FF 10%, #d8e3f1 100%)" }}
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-no-repeat bg-bottom-right mix-blend-soft-light opacity-60 pointer-events-none"
          style={{ backgroundImage: "url(https://d8it4huxumps7.cloudfront.net/uploads/images/avif/home_page_card_bg_element_new.png)", backgroundSize: "100%" }} />
      </div>
      <div className="z-10 flex items-center justify-center">
        <Icon size={28} className={active ? "text-indigo-600" : "text-[#00264D]"} />
      </div>
      <div className={`text-[12px] font-semibold z-10 ${active ? "text-indigo-600" : "text-[#00264D]"}`}>{title}</div>
    </button>
  );
}

export default function MentorListing() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);
  const [checkedExperience, setCheckedExperience] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const clearAll = () => { setSearch(""); setCheckedCategories([]); setCheckedPrice([]); setCheckedExperience([]); setActiveCategory(null); };
  const activeFilterCount = checkedCategories.length + checkedPrice.length + checkedExperience.length;

  const filtered = mentors
    .filter(m => {
      const q = search.toLowerCase();
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.company.toLowerCase().includes(q) || m.skills.some(s => s.toLowerCase().includes(q));
      const matchCategory = !activeCategory || m.skills.some(s => s.toLowerCase().includes(activeCategory.toLowerCase()));
      const matchPrice = checkedPrice.length === 0 || checkedPrice.some(p => {
        const price = m.price.replace("₹", "").replace("/session", "");
        if (p === "Free") return m.price.includes("Free");
        if (p === "Under ₹1,000") return price < 1000;
        if (p === "₹1,000 - ₹2,000") return price >= 1000 && price <= 2000;
        return price > 2000;
      });
      const matchExp = checkedExperience.length === 0 || checkedExperience.some(e => {
        if (e === "Top Rated") return m.isTopMentor;
        if (e === "Professional") return m.title.includes("Manager") || m.title.includes("Founder");
        return !m.title.includes("Manager") && !m.title.includes("Founder");
      });
      return matchSearch && matchCategory && matchPrice && matchExp;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price") return parseFloat(a.price.replace(/[^\d]/g, "")) - parseFloat(b.price.replace(/[^\d]/g, ""));
      return b.reviews - a.reviews;
    });

  const sidebarProps = { checkedCategories, setCheckedCategories, checkedPrice, setCheckedPrice, checkedExperience, setCheckedExperience, onClear: clearAll };

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#dce8f8] via-[#eef1fb] to-[#dde8f5] px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-1">Mentorship</p>
          <h1 className="text-[34px] font-black text-slate-900 leading-none" style={{ letterSpacing: "-0.03em" }}>
            <span className="text-indigo-500">Find Your Perfect</span> Mentor
          </h1>
          <p className="text-slate-500 mt-1.5 text-[14px]">Connect with expert mentors for career guidance and skill development</p>

          {/* Search */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by mentor name, company or skill..."
                className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none text-[13px] text-slate-700 font-medium"
              />
            </div>
            <button className="h-11 px-5 bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-bold rounded-2xl shadow-sm transition-colors flex-shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="border-b border-slate-100 bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat, i) => (
              <CategoryChip
                key={i}
                title={cat.title}
                icon={cat.icon}
                active={activeCategory === cat.title}
                onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex gap-6 items-start">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-20">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <SidebarFilters {...sidebarProps} />
            </div>
          </aside>

          {/* Cards Column */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-600 shadow-sm"
                >
                  <SlidersHorizontal size={13} /> Filters
                  {activeFilterCount > 0 && <span className="bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{activeFilterCount}</span>}
                </button>
                <p className="text-[13px] text-slate-500 font-medium">
                  <span className="text-slate-900 font-bold">{filtered.length}</span> mentors found
                </p>
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none border border-slate-200 bg-white rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-700 shadow-sm pr-7 focus:ring-2 focus:ring-indigo-400 outline-none cursor-pointer"
                >
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="price">Price: Low to High</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Active filter chips */}
            {(activeCategory || activeFilterCount > 0) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory && (
                  <span className="flex items-center gap-1.5 text-[12px] bg-indigo-50 text-indigo-600 border border-indigo-200 px-3 py-1 rounded-full font-semibold">
                    {activeCategory}
                    <button onClick={() => setActiveCategory(null)}><X size={11} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Cards or Empty State */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="text-slate-400" />
                </div>
                <p className="text-slate-600 font-semibold text-[14px]">No mentors found</p>
                <p className="text-slate-400 text-[12px] mt-1">Try adjusting your filters or search term</p>
                <button onClick={clearAll} className="mt-4 text-indigo-500 text-[13px] font-semibold hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <span className="font-bold text-slate-900 text-[14px]">Filters</span>
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="p-5"><SidebarFilters {...sidebarProps} /></div>
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4">
              <button onClick={() => setMobileOpen(false)} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[13px] py-3 rounded-2xl transition-colors">
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}