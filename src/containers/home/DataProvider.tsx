import React, { createContext, useContext, useState } from "react";

const initialValues = {
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
};

const DataContext = createContext<{
  state: typeof initialValues;
  setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  updateRequisitionDetails: (updatedDetails: Partial<typeof initialValues.requisitionDetails>) => void;
  updateJobDetails: (updatedDetails: Partial<typeof initialValues.jobDetails>) => void;
  updateInterviewSettings: (updatedSettings: Partial<typeof initialValues.interviewSettings>) => void;
} | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(initialValues);

  // Update Requisition Details
  const updateRequisitionDetails = (updatedDetails: Partial<typeof initialValues.requisitionDetails>) => {
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        ...updatedDetails,
      },
    }));
  };

  // Update Job Details
  const updateJobDetails = (updatedDetails: Partial<typeof initialValues.jobDetails>) => {
    setState((prevState) => ({
      ...prevState,
      jobDetails: {
        ...prevState.jobDetails,
        ...updatedDetails,
      },
    }));
  };

  // Update Interview Settings
  const updateInterviewSettings = (updatedSettings: Partial<typeof initialValues.interviewSettings>) => {
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        ...updatedSettings,
      },
    }));
  };

  return (
    <DataContext.Provider value={{ state, setState, updateRequisitionDetails, updateJobDetails, updateInterviewSettings }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export default DataProvider;
