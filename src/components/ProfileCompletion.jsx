import React from "react";
import { Plus, Facebook, Instagram, Linkedin, Github, X } from "lucide-react";

import About from "../assets/about.webp";
import Resume from "../assets/resume.webp";
import Skills from "../assets/skills.webp";
import Work from "../assets/work.webp";
import Education from "../assets/education.webp";

export default function ProfileCompletion({ openEditSection }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl border border-gray-200 shadow-sm my-4">
        
        <Section
          title="About"
          desc="Craft an engaging story in your bio and make meaningful connections with peers and recruiters alike!"
          action="Add About"
          img={About}
          onClick={() => openEditSection("about")}
        />

        <Divider />

        <ResumeSection onClick={() => openEditSection("resume")} />

        <Divider />

        <Section
          title="Skills"
          desc="Spotlight your unique skills and catch the eye of recruiters looking for your exact talents!"
          action="Add Skills"
          img={Skills}
          onClick={() => openEditSection("skills")}
        />

        <Divider />

        <Section
          title="Work Experience"
          desc="Narrate your professional journey and fast-track your way to new career heights!"
          action="Add Work Experience"
          img={Work}
          onClick={() => openEditSection("experience")}
        />

        <Divider />

        <Section
          title="Education"
          desc="Showcase your academic journey and open doors to your dream career opportunities!"
          action="Add Education"
          img={Education}
          onClick={() => openEditSection("education")}
        />

        <Divider />

        <SocialLinks onClick={() => openEditSection("social")} />

        <Divider />

        <StreakSection />

      </div>
    </div>
  );
}

const Section = ({ title, desc, action, img, onClick }) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 px-4 py-5 sm:px-8 sm:py-6">
      <div className="flex-1 max-w-xl">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3">
          {desc}
        </p>
        <button
          onClick={onClick}
          className="text-blue-600 font-medium text-xs sm:text-sm hover:underline cursor-pointer"
        >
          {action}
        </button>
      </div>
      <img src={img} alt={title} className="w-12 h-12 sm:w-20 sm:h-20 object-contain opacity-70 self-start sm:self-center" />
    </div>
  );
};

const ResumeSection = ({ onClick }) => {
  return (
    <div className="px-4 sm:px-8 py-5 sm:py-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
        Resume
      </h3>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 gap-4">
        <div className="flex-1 max-w-xl">
          <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1 sm:mb-2">
            Add your Resume & get your profile filled in a click!
          </h4>
          <p className="text-gray-600 text-xs sm:text-sm mb-4">
            Adding your Resume helps you to tell who you are and what makes you different—to employers and recruiters
          </p>
          <button
            onClick={onClick}
            className="text-blue-600 font-medium text-xs sm:text-sm hover:underline cursor-pointer"
          >
            Upload Resume
          </button>
        </div>
        <img
          src={Resume}
          alt="resume"
          className="w-14 sm:w-24 object-contain opacity-80 self-start md:self-center"
        />
      </div>
    </div>
  );
};

const Divider = () => <div className="border-t border-gray-200" />;

const SocialLinks = ({ onClick }) => {
  const icons = [Facebook, Instagram, Linkedin, Github, X];

  return (
    <div className="px-4 sm:px-8 py-5 sm:py-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Social Links
        </h3>
        <Plus size={18} className="cursor-pointer text-gray-600 hover:text-blue-600 transition" />
      </div>
      <div className="flex gap-3 sm:gap-4 flex-wrap">
        {icons.map((Icon, i) => (
          <button
            key={i}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition"
            onClick={onClick}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        ))}
      </div>
    </div>
  );
};

const StreakSection = () => {
  const months = ["Apr, 2025", "May, 2025", "Jun, 2025", "Jul, 2025", "Aug, 2025", "Sep, 2025"];

  return (
    <div className="px-4 sm:px-8 py-5 sm:py-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        Streaks
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-6">
        {months.map((month, i) => (
          <div key={i} className="bg-gray-50 p-2 rounded-lg sm:bg-transparent sm:p-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">{month}</p>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full aspect-square max-w-[12px] bg-gray-200 rounded-sm"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-gray-700 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-600">Activity:</span>
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-200 rounded-sm" />
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-sm" />
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-sm" />
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-800 rounded-sm" />
        </div>
        <div className="flex gap-4 sm:gap-6">
          <div>
            Current Streak <span className="font-semibold text-blue-600">9 Days</span>
          </div>
          <div>
            Max Streak <span className="font-semibold text-green-600">9 Days</span>
          </div>
        </div>
      </div>
    </div>
  );
};