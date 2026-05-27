import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const companies = [
  {
    name: "Amazon",
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/6821cc8a863ce_amazon.png",
    filter: "Amazon",
  },
  {
    name: "Google",
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/6821cc9a9ba3b_google.png",
    filter: "Google",
  },
  {
    name: "Microsoft",
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/682b139fd4ecc_microsoft.png",
    filter: "Microsoft",
  },
  {
    name: "IBM",
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/682b139023523_ibm.png",
    filter: "IBM",
  },
  {
    name: "Flipkart",
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/6821cd4035042_flipkart.png",
    filter: "Flipkart",
  },
];

function CompanyCard({ name, logo, filter }) {
  return (
    <Link
      to="/mentorship"
      state={{ company: name }}
      className="group rounded-2xl border border-gray-200 w-[230px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className=" flex items-center justify-center h-28 bg-gray-50 rounded-2xl m-1">
        <div className="bg-white rounded-full w-18 h-18 flex items-center justify-center shadow-sm">
          <img
            src={logo}
            alt={name}
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold text-gray-800">
          {name}
        </span>

        <ChevronRight
          size={22}
          className="text-gray-400 group-hover:text-indigo-600 transition"
        />
      </div>
    </Link>
  );
}

export default function TopCompanies() {
  return (
    <section className=" py-6">
      <div className="max-w-7xl mx-auto ">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-7 bg-indigo-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">
            Mentors from Top Companies
          </h2>
        </div>

        <div className="flex justify-between flex-wrap gap-4 overflow-visible">
          {companies.map((company) => (
            <CompanyCard
              key={company.name}
              {...company}
            />
          ))}
        </div>

      </div>
    </section>
  );
}