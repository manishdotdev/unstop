import { Send, ArrowUpRight } from "lucide-react"
import Logo from "../../assets/logo.png"

export default function Footer() {

  return (
    <footer className="relative mt-32 text-white overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-black">

      {/* Animated glow orbs */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full top-[-150px] left-[-100px] animate-pulse"/>
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-80px] animate-pulse"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">

        {/* Center Hub */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">

          <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
            Ready to discover your next opportunity?
          </h2>

          <p className="text-slate-400 mt-4 text-sm">
            Explore internships, competitions, and jobs from top organizations worldwide.
          </p>

          <button className="mt-8 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition flex items-center gap-2 mx-auto font-semibold">
            Explore Opportunities
            <ArrowUpRight size={16}/>
          </button>

        </div>


        {/* Glass navigation grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

          {/* Brand */}
          <div className="space-y-4">

            <img src={Logo} className="h-12"/>

            <p className="text-sm text-slate-400 leading-relaxed">
              Discover internships, jobs, competitions and learning
              opportunities curated for students worldwide.
            </p>

          </div>

          <FooterColumn
            title="Opportunities"
            links={[
              "Internships",
              "Jobs",
              "Competitions",
              "Hackathons",
              "Scholarships"
            ]}
          />

          <FooterColumn
            title="Learning"
            links={[
              "Courses",
              "Workshops",
              "Mentorship",
              "Articles",
              "Career Guides"
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              "About",
              "Careers",
              "Contact",
              "Privacy",
              "Terms"
            ]}
          />

        </div>


        {/* Newsletter card */}
        <div className="mt-20 flex justify-center">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 flex items-center gap-4 w-full max-w-lg">

            <input
              placeholder="Enter your email"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
            />

            <button className="flex items-center justify-center w-11 h-11 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition">
              <Send size={18}/>
            </button>

          </div>

        </div>


        {/* Bottom bar */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">

          <p>
            © {new Date().getFullYear()} Your Platform — Built with ❤ in India
          </p>

          {/* Floating socials */}

          <div className="flex gap-4">

            {[
              "twitter_logo.svg",
              "social-share/instagram-icon.svg",
              "social-share/linkedin-icon.svg",
              "social-share/youtube-icon.svg",
            ].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer"
              >
                <img
                  src={`https://d8it4huxumps7.cloudfront.net/uploads/images/${icon}`}
                  className="h-4 opacity-80"
                />
              </div>
            ))}

          </div>

        </div>

      </div>

    </footer>
  )
}


function FooterColumn({ title, links }) {

  return (
    <div>

      <h4 className="font-semibold mb-4 text-white">
        {title}
      </h4>

      <ul className="space-y-2 text-sm text-slate-400">

        {links.map((link, i) => (
          <li
            key={i}
            className="hover:text-white cursor-pointer transition"
          >
            {link}
          </li>
        ))}

      </ul>

    </div>
  )
}