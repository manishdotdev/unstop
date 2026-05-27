import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, SlidersHorizontal, Search, Filter } from "lucide-react"
import { mockTests, testCategories } from "../../data/mockTestsData"

export default function MockTest() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedCompany, setSelectedCompany] = useState("All")
  const [selectedRole, setSelectedRole] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const companies = ["All", "TCS", "Accenture", "Deloitte", "Amazon", "Microsoft", "NVIDIA", "EY", "Fractal Analytics"]
  const roles = ["All", "Software Engineer", "Data Analyst", "Backend Developer", "Embedded Systems", "Consultant", "Data Scientist"]

  const filteredTests = mockTests.filter(test => {
    const matchesCategory = activeCategory === "All" || test.category === activeCategory
    const matchesCompany = selectedCompany === "All" || test.company === selectedCompany
    const matchesSearch = searchQuery === "" || 
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesCompany && matchesSearch
  })

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
              AI-Powered Mock Tests
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Practice with company-specific mock tests and assess your preparation level
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search mock tests, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {testCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <FilterButton 
              label="Filters" 
              count={4}
              onClick={() => {}}
            />
            
            <select 
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-4 h-10 border border-slate-200 rounded-full bg-white text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none min-w-[160px]"
            >
              {companies.map(company => (
                <option key={company} value={company}>{company === "All" ? "Company" : company}</option>
              ))}
            </select>

            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 h-10 border border-slate-200 rounded-full bg-white text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none min-w-[160px]"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role === "All" ? "Role" : role}</option>
              ))}
            </select>

            <FilterDropdown label="Difficulty" />
            <FilterDropdown label="Sort By" />

            <button className="h-10 px-5 border border-red-500 rounded-full text-red-500 font-semibold text-sm hover:bg-red-50 transition">
              Clear All
            </button>
          </div>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <MockTestCard key={test.id} test={test} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 gap-1">
          <button className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 transition">
            &lsaquo;
          </button>
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`w-9 h-9 rounded-lg text-sm font-semibold ${
                num === 1
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 bg-white border border-slate-200"
              } transition`}
            >
              {num}
            </button>
          ))}
          <button className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
            &rsaquo;
          </button>
        </div>
      </section>
    </div>
  )
}

function MockTestCard({ test }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Header with Gradient */}
      <div className={`h-24 bg-gradient-to-r ${test.color} relative flex items-center justify-center`}>
        <div className="absolute -bottom-8 w-16 h-16 rounded-xl border-4 border-white bg-white shadow-lg flex items-center justify-center">
          <img 
            src={test.companyLogo} 
            alt={test.company} 
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      <div className="p-5 pt-10">
        <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">
          {test.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4">{test.company}</p>

        <p className="text-[13px] text-slate-600 mb-4 line-clamp-2">
          {test.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-[12px] text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {test.attempts.toLocaleString()} attempts
          </div>
          <div>Avg. Score: {test.avgScore}%</div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {test.skills.slice(0, 3).map((skill, i) => (
            <span 
              key={i} 
              className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {test.skills.length > 3 && (
            <span className="text-[11px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
              +{test.skills.length - 3}
            </span>
          )}
        </div>

        {/* Test Info */}
        <div className="flex items-center justify-between text-[12px] text-slate-500 mb-4">
          <span>{test.duration} · {test.totalQuestions} questions</span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
            test.difficulty === "Easy" ? "bg-green-100 text-green-700" :
            test.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
            "bg-red-100 text-red-700"
          }`}>
            {test.difficulty}
          </span>
        </div>

        {/* Action Button */}
        <Link
          to={`/mocktest/${test.id}`}
          className="block w-full text-center py-2.5 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all"
        >
          Start Test
        </Link>
      </div>
    </div>
  )
}

function FilterButton({ label, count, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-5 h-10 border border-slate-200 rounded-full text-[14px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition"
    >
      <SlidersHorizontal size={16} />
      {label}
      <span className="ml-1 px-2 h-5 flex items-center justify-center text-xs font-semibold bg-indigo-600 text-white rounded-full">
        {count}
      </span>
    </button>
  )
}

function FilterDropdown({ label }) {
  return (
    <button className="flex items-center gap-2 px-4 h-10 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
      {label}
      <ChevronDown size={16} />
    </button>
  )
}