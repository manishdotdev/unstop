import "keen-slider/keen-slider.min.css"
import "react-phone-number-input/style.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "./components/Sidebar"
import { UserProvider } from "./context/UserContext"

import Home from "./pages/Talent-pages/Home"
import Notifications from "./pages/Talent-pages/Notifications"
import InternshipsHero from "./pages/Talent-pages/Internship"
import JobsHero from "./pages/Talent-pages/Jobs"
import CompetitionHero from "./pages/Talent-pages/Competition"
import HackathonHero from "./pages/Talent-pages/Hackathon"
import QuizzesHero from "./pages/Talent-pages/Quizzes"
import ScholarshipHero from "./pages/Talent-pages/Scholarship"
import WorkshopHero from "./pages/Talent-pages/Workshops"
import ConferenceHero from "./pages/Talent-pages/Conference"
import EventHero from "./pages/Talent-pages/Events"
import FestHero from "./pages/Talent-pages/Fest"
import MentorListing from "./pages/Talent-pages/MentorListing"
import MentorDetail from "./pages/Talent-pages/MentorDetail"
import MockTestHero from "./pages/Talent-pages/MockTest"
import MockInterviewHero from "./pages/Talent-pages/MockInterview"
import MockTestDetail from "./pages/Talent-pages/MockTestDetail"
import MockInterviewDetailPage from "./pages/Talent-pages/MockInterviewDetail"
import MyApplications from "./pages/Talent-pages/MyApplications"
import ApplicationDetail from "./pages/Talent-pages/ApplicationDetail"

import DashboardHeader from "./components/Recuiter-component/Dashboard"
import MyJobsInternships from "./components/Recuiter-component/MyInternship"
import Opportunities from "./components/Recuiter-component/MyOpportunities"
import Festivals from "./components/Recuiter-component/Festivals"
import AssessmentsPanel from "./components/Recuiter-component/Assesments"

import UserProfile from "./components/User"

import JobPost from "./pages/Recruiter/JobPost"
import JobDescription from "./pages/Recruiter/JobDescription"
import Experience from "./pages/Recruiter/Experience"
import JobDetail from "./pages/Talent-pages/JobDetail"
import CompetitionDetail from "./pages/Talent-pages/CompetitionDetail"
import ApplicationPreview from "./pages/Talent-pages/ApplicationPreview"

import InternshipDetail from "./components/InternshipDetail"
import ComingSoon from "./components/ComingSoon"

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/internship" element={<InternshipsHero />} />
            <Route path="/competition" element={<CompetitionHero />} />
            <Route path="/hackathon" element={<HackathonHero />} />
            <Route path="/quizzes" element={<QuizzesHero />} />
            <Route path="/scholarship" element={<ScholarshipHero />} />
            <Route path="/workshops" element={<WorkshopHero />} />
            <Route path="/conference" element={<ConferenceHero />} />
            <Route path="/events" element={<EventHero />} />
            <Route path="/fest" element={<FestHero />} />
<Route path="/mentorship" element={<MentorListing />} />
             <Route path="/mentordetail/:id" element={<MentorDetail />} />
<Route path="/mocktest" element={<MockTestHero />} />
             <Route path="/mocktest/:id" element={<MockTestDetail />} />
             <Route path="/mockinterview" element={<MockInterviewHero />} />
             <Route path="/mockinterview/:id" element={<MockInterviewDetailPage />} />
            <Route path="/code" element={<ComingSoon />} />
            <Route path="/courses" element={<ComingSoon />} />

            <Route path="/dashboard" element={<DashboardHeader />} />
            <Route path="/myjobinternships" element={<MyJobsInternships />} />
            <Route path="/myopportunities" element={<Opportunities />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/assessments" element={<AssessmentsPanel />} />

            <Route path="/user" element={<UserProfile />} />

            <Route path="/jobpost" element={<JobPost />} />
            <Route path="/jobdescription" element={<JobDescription />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/application-preview" element={<ApplicationPreview />} />

            <Route path="/internshipdetail/:id" element={<InternshipDetail />} />
            <Route path="/jobs" element={<JobsHero />} />
            <Route path="/jobdetail/:id" element={<JobDetail />} />
            <Route path="/competitiondetail/:id" element={<CompetitionDetail />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/my-applications/:id" element={<ApplicationDetail />} />
            <Route path="/my-applications" element={<MyApplications />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  )
}

export default App