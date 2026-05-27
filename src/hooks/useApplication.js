import { useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';

export const useApplication = () => {
  const { userData, addApplication } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Prepare application data from user profile
  const prepareApplicationData = useCallback((jobOrInternship) => {
    if (!userData) return null;
    
    return {
      candidate: {
        personalInfo: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          location: userData.currLoc,
        },
        education: userData.education,
        experience: userData.experience,
        skills: userData.skills,
        ...(userData.role && { preferredRole: userData.role }),
        ...(userData.prefLoc && { preferredLocation: userData.prefLoc }),
      },
      position: {
        id: jobOrInternship.id,
        title: jobOrInternship.title,
        company: jobOrInternship.company,
        ...(jobOrInternship.location && { location: jobOrInternship.location }),
        ...(jobOrInternship.salary && { salary: jobOrInternship.salary }),
        ...(jobOrInternship.stipend && { stipend: jobOrInternship.stipend }),
        ...(jobOrInternship.duration && { duration: jobOrInternship.duration }),
        ...(jobOrInternship.applyBy && { applyBy: jobOrInternship.applyBy }),
      },
      appliedAt: new Date().toISOString(),
      source: 'unstop_platform',
    };
  }, [userData]);

  // Handle single click apply: prepare and return the application data
  const handleSingleClickApply = useCallback((jobOrInternship) => {
    if (!userData) {
      setSubmitError('User profile not available. Please complete your profile first.');
      return null;
    }

    const applicationData = prepareApplicationData(jobOrInternship);
    if (!applicationData) {
      setSubmitError('Unable to prepare application data.');
      return null;
    }

    return applicationData;
  }, [userData, prepareApplicationData]);

  // Handle submission of the application
  const handleSubmitApplication = useCallback((applicationData) => {
    if (!applicationData) return;

    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate API call (in real app, this would be an actual API request)
    setTimeout(() => {
      // Add to applications history
      addApplication(applicationData);
      
      // Simulate successful submission
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // In a real app, you would make an API call here like:
      // fetch('/api/apply', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(applicationData)
      // })
    }, 1500);
  }, [addApplication]);

  // Reset application state
  const resetApplicationState = useCallback(() => {
    setIsSubmitting(false);
    setSubmitSuccess(false);
    setSubmitError(null);
  }, []);

  return {
    prepareApplicationData,
    handleSingleClickApply,
    handleSubmitApplication,
    resetApplicationState,
    isSubmitting,
    submitSuccess,
    submitError
  };
};