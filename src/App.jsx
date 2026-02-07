import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OnboardingStep1 from './pages/OnboardingStep1';
import OnboardingStep2 from './pages/OnboardingStep2';
import OnboardingStep3 from './pages/OnboardingStep3';
import OnboardJobSeekerRole from './pages/OnboardJobSeekerRole';
import OnboardJobSeekerExperienceLevel from './pages/OnboardJobSeekerExperienceLevel';
import JobSeekerRoleChallenge from './pages/JobSeekerRoleChallenge'; // Adjust path if needed
import JobSeekerSkillAssessment from './pages/JobSeekerSkillAssessment';
import JobSeekerPreferences from './pages/JobSeekerPreferences';
import JobSeekerWelcomeDashboard from './pages/JobSeekerWelcomeDashboard';
import JobSeekerReviewProfile from './pages/JobSeekerReviewProfile';
import CareerSwitcherBackground from './pages/CareerSwitcherBackground';
import CareerSwitcherRole from './pages/CareerSwitcherRole';
import CareerSwitcherTechnicalExposure from './pages/CareerSwitcherTechnicalExposure';
import CareerSwitcherTimeCommitment from './pages/CareerSwitcherTimeCommitment';
import CareerSwitcherConcerns from './pages/CareerSwitcherConcerns';
import CareerSwitcherReview from './pages/CareerSwitcherReview';
import CareerSwitcherWelcomeDashboard from './pages/CareerSwitcherWelcomeDashboard';
import DashboardWelcome from './pages/DashboardWelcome';
import DashboardMain from './pages/DashboardMain'; 
import RoadmapOverview from './pages/RoadmapOverview'; 
import PhaseDetail from './pages/PhaseDetail';
import MentorModule from './pages/MentorModule';
import MyBookings from './pages/MyBookings'; 
import MentorProfile from './pages/MentorProfile'; 
import MentorSchedule from './pages/MentorSchedule';
import BookingConfirmation from './pages/BookingConfirmation';
import ResumePage from './pages/ResumePage';
import ResumeEditor from './pages/ResumeEditor';
import ResumeExperience from './pages/ResumeExperience';
import ResumeEducation from './pages/ResumeEducation';
import ResumeSkills from './pages/ResumeSkills'; 
import ResumeProjects from './pages/ResumeProjects';
import ResumeCertifications from './pages/ResumeCertifications';
import ResumeScore from './pages/ResumeScore';
import MockInterview from './pages/MockInterview';
import AiInterview from './pages/AiInterview';
import HumanInterview from './pages/HumanInterview';
import LmsCourses from './pages/LmsCourses';
import LmsCourseDetail from './pages/LmsCourseDetail';
import LmsLearningGoal from './pages/LmsLearningGoal';
import LmsLearningProgress from './pages/LmsLearningProgress';
import LmsLearningRewards from './pages/LmsLearningRewards';
import LmsPracticeGround from './pages/LmsPracticeGround';
import LmsCodingPractice from './pages/LmsCodingPractice';
import LmsCodingPlatform from './pages/LmsCodingPlatform';
import LmsCodingResult from './pages/LmsCodingResult';
import Settings from './pages/Settings';
import ProfileScreen from './pages/ProfileScreen';
import EditProfile from './pages/EditProfile';
import InternshipOpportunities from './pages/InternshipOpportunities';
import InternshipApplyRole from './pages/InternshipApplyRole';
import InternshipSaveOpportunity from './pages/InternshipSaveOpportunity';












function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        
        {/* Onboarding */}
        <Route path="/onboarding/step-1" element={<OnboardingStep1 />} />
        <Route path="/onboarding/step-2" element={<OnboardingStep2 />}/>
        <Route path="/onboarding/step-3" element={<OnboardingStep3 />} />
        <Route path="/onboarding/role" element={<OnboardJobSeekerRole />} />
        <Route path="/onboarding/jobseekexperience" element={<OnboardJobSeekerExperienceLevel />} />
        <Route path="/onboarding/role-challenge" element={<JobSeekerRoleChallenge />} />
        <Route path="/onboarding/skill-assessment" element={<JobSeekerSkillAssessment />} />
        <Route path="/onboarding/preferences" element={<JobSeekerPreferences />} />
        <Route path="/onboarding/review" element={<JobSeekerReviewProfile />} />
        <Route path="/onboarding/welcome-dashboard" element={<JobSeekerWelcomeDashboard />} />
        <Route path="/onboarding/switcher/background" element={<CareerSwitcherBackground />} />
        <Route path="/onboarding/switcher/role" element={<CareerSwitcherRole />} />
        <Route path="/onboarding/switcher/exposure" element={<CareerSwitcherTechnicalExposure />} />
        <Route path="/onboarding/switcher/time-commitment" element={<CareerSwitcherTimeCommitment />} />
        <Route path="/onboarding/switcher/concerns" element={<CareerSwitcherConcerns />} />
        <Route path="/onboarding/switcher/review" element={<CareerSwitcherReview />} />
        <Route path="/onboarding/switcher/welcome-dashboard" element={<CareerSwitcherWelcomeDashboard />} />
        {/* Dashboard & Roadmap Sections */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/main" replace />} />
        <Route path="/dashboard/main" element={<DashboardMain />} />
        <Route path="/dashboard/welcome" element={<DashboardWelcome />} />
        
        {/* Roadmap Overview */}
        <Route path="/dashboard/roadmap" element={<RoadmapOverview />} />
        
        {/* Phase Details - Linked correctly to the roadmap parent */}
        <Route path="/dashboard/roadmap/phase-1" element={<PhaseDetail />} />
        <Route path="/dashboard/roadmap/phase-2" element={<PhaseDetail />} />
        
        {/* Task Detail Routes - Added to prevent "Empty Page" when clicking tasks */}
        <Route path="/task/:taskId" element={<PhaseDetail />} /> 
        <Route path="/mentors" element={<MentorModule />} />
      
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/mentor-profile" element={<MentorProfile />} />
        <Route path="/mentorschedule" element={<MentorSchedule />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/resume-editor" element={<ResumeEditor />} />
        <Route path="/resume-experience" element={<ResumeExperience />} />
        <Route path="/resume-education" element={<ResumeEducation />} />
        <Route path="/resume-skills" element={<ResumeSkills />} />
        <Route path="/resume-projects" element={<ResumeProjects />} /> 
        <Route path="/resume-certifications" element={<ResumeCertifications />} />
        <Route path="/resume-score" element={<ResumeScore />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/ai-interview" element={<AiInterview />} />
        <Route path="/human-interview" element={<HumanInterview />} />
        <Route path="/lms-courses" element={<LmsCourses />} />
        <Route path="/course-detail" element={<LmsCourseDetail />} />
        <Route path="/set-goal" element={<LmsLearningGoal />} />
        <Route path="/learning-progress" element={<LmsLearningProgress />} />
        <Route path="/rewards" element={<LmsLearningRewards />} />
        <Route path="/practice-ground" element={<LmsPracticeGround />} />
        <Route path="/coding-practice" element={<LmsCodingPractice />} />
        <Route path="/coding-platform" element={<LmsCodingPlatform />} />
        <Route path="/coding-result" element={<LmsCodingResult />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/internships-jobs" element={<InternshipOpportunities />} />
        <Route path="/internship/apply" element={<InternshipApplyRole />} />
        <Route path="/internship/saved" element={<InternshipSaveOpportunity />} />
        {/* Catch-all to prevent blank screens on typos */}
        <Route path="*" element={<Navigate to="/dashboard/main" replace />} />
      </Routes>
    </Router>
  );

}

export default App;

// Inside Routes:
