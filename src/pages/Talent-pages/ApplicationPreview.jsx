import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApplication } from '../../hooks/useApplication';
import {
  MapPin, Clock, Banknote, Users, Building2, CheckCircle2, Award, Zap,
  ArrowLeft, Check, X, Loader2, MessageCircle, AlertTriangle, Hourglass
} from 'lucide-react';

export default function ApplicationPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmitApplication, isSubmitting, submitSuccess, submitError, resetApplicationState } = useApplication();

  const [showSuccess, setShowSuccess] = useState(false);

  // Get preview data from location state
  const previewData = location.state?.previewData || null;

    const handleSubmit = () => {
      handleSubmitApplication(previewData);
    };

  // Handle success submission
  // We'll use a useEffect to handle submitSuccess, but for simplicity we'll just check and show a message
  // Alternatively, we can redirect to a success page.

  if (submitSuccess) {
    // Show success message and then redirect back to home or opportunity list after a delay
    setShowSuccess(true);
    // We can also reset state after a delay
    setTimeout(() => {
      resetApplicationState();
      navigate('/'); // or navigate back to opportunities
    }, 2000);
  }

  if (!previewData) {
    // If no preview data, redirect back
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <ArrowLeft size={16} className="cursor-pointer hover:text-indigo-600" onClick={() => navigate(-1)} />
          <span>Application Preview</span>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Application Preview</h1>
            <p className="text-sm text-white/80 mt-1">Review your application before submission</p>
          </div>

          {/* Content */}
          <div className="px-6 py-8 space-y-8">
            {/* Candidate Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Users size={20} className="text-indigo-600" />
                Candidate Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-800">Personal Details</h3>
                 <div className="space-y-3 text-slate-700">
                   <p className="flex items-center gap-2">
                     <Users size={16} className="text-indigo-500" />
                     <span>{previewData.candidate.personalInfo.firstName} {previewData.candidate.personalInfo.lastName}</span>
                   </p>
                   <p className="flex items-center gap-2">
                     <MapPin size={16} className="text-indigo-500" />
                     <span>{previewData.candidate.personalInfo.location}</span>
                   </p>
                   <p className="flex items-center gap-2">
                     <MapPin size={16} className="text-indigo-500" />
                     <span>{previewData.candidate.personalInfo.email}</span>
                   </p>
                   <p className="flex items-center gap-2">
                     <MapPin size={16} className="text-indigo-500" />
                     <span>{previewData.candidate.personalInfo.phone}</span>
                   </p>
                 </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-800">Education & Experience</h3>
                  <div className="space-y-3 text-slate-700">
                    {previewData.candidate.education?.map((edu, idx) => (
                      <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                        <p className="font-medium text-slate-900">{edu.degree} in {edu.field}</p>
                        <p className="text-sm text-slate-600">{edu.institution} • {edu.year}</p>
                        {edu.grade && <p className="text-sm text-slate-600">Grade: {edu.grade}</p>}
                      </div>
                    ))}
                    {previewData.candidate.experience?.map((exp, idx) => (
                      <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                        <p className="font-medium text-slate-900">{exp.title} at {exp.company}</p>
                        <p className="text-sm text-slate-600">{exp.duration}</p>
                        <p className="text-sm text-slate-600 line-clamp-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900 flex items-center gap-2">
                  <Award size={20} className="text-indigo-600" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {previewData.candidate.skills?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 text-sm font-medium bg-indigo-50 text-indigo-800 rounded-full border border-indigo-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Position Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Building2 size={20} className="text-indigo-600" />
                Position Details
              </h2>
              <div className="space-y-4">
                <div className="space-y-3 text-slate-700">
                  <p className="font-medium text-slate-900 text-lg">{previewData.position.title}</p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-500" />
                    <span>{previewData.position.company}</span>
                  </p>
                  {previewData.position.location && (
                    <p className="flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-500" />
                      <span>{previewData.position.location}</span>
                    </p>
                  )}
                  {previewData.position.salary && (
                    <p className="flex items-center gap-2">
                      <Banknote size={16} className="text-indigo-500" />
                      <span>{previewData.position.salary}</span>
                    </p>
                  )}
                  {previewData.position.stipend && (
                    <p className="flex items-center gap-2">
                      <Banknote size={16} className="text-indigo-500" />
                      <span>{previewData.position.stipend}</span>
                    </p>
                  )}
                  {previewData.position.duration && (
                    <p className="flex items-center gap-2">
                      <Clock size={16} className="text-indigo-500" />
                      <span>{previewData.position.duration}</span>
                    </p>
                  )}
                  {previewData.position.applyBy && (
                    <p className="flex items-center gap-2">
                      <Hourglass size={16} className="text-indigo-500" />
                      <span>Apply by: {previewData.position.applyBy}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Action Buttons */}
          <div className="px-6 py-6 bg-slate-50 rounded-b-2xl border-t border-slate-100">
            {showSuccess ? (
              <div className="text-center space-y-4">
                <Check size={48} className="mx-auto text-emerald-500" />
                <h2 className="text-xl font-bold text-slate-900">Application Submitted Successfully!</h2>
                <p className="text-slate-600">Thank you for applying. We'll notify you of any updates.</p>
                <button
                  onClick={() => {
                    navigate('/');
                  }}
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Go to Home
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 px-5 mb-5 flex items-center gap-15 md:mb-0 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" /> Back to Edit
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-5 py-3 flex items-center gap-15 mb-5 md:mb-0 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <SubmitApplication />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for submit button when not submitting
function SubmitApplication() {
  return (
    <>
      <Check size={20} className="mr-2" />
      Submit Application
    </>
  );
}