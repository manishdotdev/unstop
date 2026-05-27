import { useState } from "react";
import { Search, MapPin, Clock, Banknote, Sparkles, ArrowRight, Star, Info, ChevronDown, SlidersHorizontal, X, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { internships } from "../../data/internshipsData";

const companies = ["Google", "Amazon", "Microsoft", "OpenAI", "Adobe", "Stripe", "Meta"];
const filterOptions = ["Remote", "Part Time", "AI", "Design", "Marketing", "Engineering", "Data Science"];
const highlightSkills = ["React", "AI", "Python", "Node.js", "Figma"];

const matchColor = (score) => {
  if (score >= 90) return { bar: "from-emerald-400 to-teal-500", text: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
  if (score >= 80) return { bar: "from-indigo-400 to-violet-500", text: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200" };
  return { bar: "from-amber-400 to-orange-400", text: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
};

function InternshipCard({ job }) {
  const [saved, setSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate  = useNavigate();
  const mc = matchColor(job.match);

  return (
    <div
      className="
      bg-white
      border border-slate-200
      rounded-xl
      p-5
      hover:shadow-md
      transition
      flex flex-col
      gap-4
      "
    >


      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <img
            src={job.logo}
            alt={job.company}
            className="w-10 h-10 rounded-lg border border-slate-200 object-contain p-1 bg-white"
          />

          <div>

            <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">
              {job.title}
            </h3>

            <div className="flex items-center gap-2 mt-1">

              <span className="text-[13px] text-slate-600">
                {job.company}
              </span>

              <span className="flex items-center gap-1 text-[12px] text-slate-500">

                <Star size={12} />
                {job.rating}

              </span>

              {job.trending && (
                <span className="text-[11px] text-slate-500">
                  • Trending
                </span>
              )}

            </div>

          </div>

        </div>


        <button
          onClick={() => setSaved(!saved)}
          className="
          w-8 h-8
          rounded-md
          border border-slate-200
          flex items-center justify-center
          text-slate-500
          hover:bg-slate-50
          "
        >
          <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
        </button>

      </div>



      <div className="flex flex-wrap gap-4 text-[12px] text-slate-600">

        <span className="flex items-center gap-1">
          <MapPin size={13} />
          {job.location}
        </span>

        <span className="flex items-center gap-1">
          <Clock size={13} />
          {job.duration}
        </span>

        <span className="flex items-center gap-1">
          <Banknote size={13} />
          {job.stipend}
        </span>

      </div>



      <div className="flex flex-wrap gap-2">

        {job.skills.map((skill, i) => (

          <span
            key={i}
            className="
            text-[11px]
            px-2.5
            py-1
            rounded-md
            bg-slate-100
            text-slate-600
            "
          >
            {skill}
          </span>

        ))}

      </div>



      <div className="flex items-center gap-2">

        <Sparkles size={14} className="text-slate-500" />

        <span className="text-[12px] text-slate-600 font-medium">
          Match
        </span>

        <div className="flex-1 h-2 bg-slate-100 rounded-full">

          <div
            className="h-full rounded-full bg-slate-400"
            style={{ width: `${job.match}%` }}
          />

        </div>

        <span className="text-[12px] text-slate-600 font-medium">
          {job.match}%
        </span>



        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >

          <Info size={12} className="text-slate-400 cursor-pointer" />

          {showTooltip && (
            <div
              className="
              absolute bottom-6 right-0
              bg-slate-900 text-white
              text-[11px]
              rounded-md
              px-3 py-2
              w-48
              shadow-lg
              "
            >
              AI Match Score shows how well your
              profile fits this internship.
            </div>
          )}

        </div>

      </div>



      <div className="flex items-center justify-between pt-2 border-t border-slate-100">

        <span className="text-[11px] text-slate-400">
          Posted {job.posted}
        </span>

        <button onClick={() => navigate(`/internshipdetail/${job.id}`)}
          className="
          flex items-center gap-1
          text-[13px]
          font-semibold
          text-slate-700
          hover:text-slate-900
          transition
          cursor-pointer
          "
        >
          Apply
          <ArrowRight size={14} />
        </button>

      </div>

    </div>
  );
}

function SidebarContent({ checkedFilters, setCheckedFilters, checkedCompanies, setCheckedCompanies, stipend, setStipend, onClear }) {
  const toggle = (val, set, list) => set(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
  const activeCount = checkedFilters.length + checkedCompanies.length + (stipend > 0 ? 1 : 0);

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
          <SlidersHorizontal size={15} className="text-indigo-500" />
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
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Work Type</p>
        {filterOptions.map((f, i) => (
          <CheckRow key={i} label={f} checked={checkedFilters.includes(f)} onChange={() => toggle(f, setCheckedFilters, checkedFilters)} />
        ))}
      </div>

      <div className="border-t border-slate-100" />

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Min. Stipend</p>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[11px] text-slate-400">₹0</span>
          <span className="text-[15px] font-bold text-indigo-600" style={{ letterSpacing: "-0.02em" }}>
            ₹{stipend > 0 ? `${(stipend / 1000).toFixed(0)}k` : "0"}<span className="text-[11px] font-medium text-slate-400">/mo</span>
          </span>
          <span className="text-[11px] text-slate-400">₹50k</span>
        </div>
        <input type="range" min={0} max={50000} step={1000} value={stipend} onChange={e => setStipend(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer" />
      </div>

      <div className="border-t border-slate-100" />

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Companies</p>
        {companies.map((c, i) => (
          <CheckRow key={i} label={c} checked={checkedCompanies.includes(c)} onChange={() => toggle(c, setCheckedCompanies, checkedCompanies)} />
        ))}
      </div>

    </div>
  );
}

export default function InternshipsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");
  const [checkedFilters, setCheckedFilters] = useState([]);
  const [checkedCompanies, setCheckedCompanies] = useState([]);
  const [stipend, setStipend] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const parseStipend = (s) => parseInt(s.replace(/[^\d]/g, "")) * (s.includes("k") ? 1000 : 1);
  const clearAll = () => { setSearch(""); setCheckedFilters([]); setCheckedCompanies([]); setStipend(0); };

   const filtered = internships
     .filter(j => {
       const q = search.toLowerCase();
       const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q));
       const matchCompany = checkedCompanies.length === 0 || checkedCompanies.includes(j.company);
       const matchStipend = parseStipend(j.stipend) >= stipend;
       const matchFilters = checkedFilters.length === 0 || checkedFilters.some(f => {
         const fLower = f.toLowerCase();
         if (fLower === "remote") return j.location.toLowerCase().includes("remote");
         if (fLower === "part time") return j.type.toLowerCase().includes("part") || j.type.toLowerCase().includes("part-time");
         // For skill/domain filters
         return j.skills.some(s => s.toLowerCase().includes(fLower)) || j.title.toLowerCase().includes(fLower) || j.company.toLowerCase().includes(fLower);
       });
       return matchSearch && matchCompany && matchStipend && matchFilters;
     })
     .sort((a, b) => {
       if (sort === "stipend") return parseStipend(b.stipend) - parseStipend(a.stipend);
       if (sort === "newest") return a.posted.localeCompare(b.posted);
       return b.match - a.match;
     });

  const sidebarProps = { checkedFilters, setCheckedFilters, checkedCompanies, setCheckedCompanies, stipend, setStipend, onClear: clearAll };

return (
        <div className="min-h-screen bg-white pb-20 lg:pb-0" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

            <div className="bg-gradient-to-br from-[#dce8f8] via-[#eef1fb] to-[#dde8f5] px-6 pt-8 pb-6 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Opportunities</p>
                    <h1 className="text-[28px] sm:text-[36px] font-black text-slate-900 leading-none" style={{ letterSpacing: "-0.03em" }}>
                        Find Your Perfect <span className="text-indigo-500">Internship</span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-[14px]">27,000+ paid, remote & on-site roles waiting for you</p>

          <div className="mt-5 relative max-w-2xl flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by role, company or skill..."
                className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none text-[13px] text-slate-700 font-medium"
              />
            </div>
            <button className="h-11 px-5 bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-bold rounded-2xl shadow-sm shadow-indigo-200 transition-colors flex-shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6 items-start">

          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-6">
            <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-3xl p-5 shadow-sm">
              <SidebarContent {...sidebarProps} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">

            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-600 shadow-sm"
                >
                  <SlidersHorizontal size={13} /> Filters
                  {(checkedFilters.length + checkedCompanies.length + (stipend > 0 ? 1 : 0)) > 0 && (
                    <span className="bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {checkedFilters.length + checkedCompanies.length + (stipend > 0 ? 1 : 0)}
                    </span>
                  )}
                </button>
                <p className="text-[13px] text-slate-500 font-medium">
                  <span className="text-slate-900 font-bold">{filtered.length}</span> internships found
                </p>
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none border border-slate-200 bg-white rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-700 shadow-sm pr-7 focus:ring-2 focus:ring-indigo-400 outline-none cursor-pointer"
                >
                  <option value="relevance">Best Match</option>
                  <option value="newest">Newest</option>
                  <option value="stipend">Highest Stipend</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="text-slate-400" />
                </div>
                <p className="text-slate-600 font-semibold text-[14px]">No internships found</p>
                <p className="text-slate-400 text-[12px] mt-1">Try adjusting your filters</p>
                <button onClick={clearAll} className="mt-4 text-indigo-500 text-[13px] font-semibold hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
                {filtered.map((job, i) => <InternshipCard key={job.id} job={job} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>

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
            <div className="p-5"><SidebarContent {...sidebarProps} /></div>
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