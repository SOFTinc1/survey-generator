import React, { createContext, useState, useEffect } from "react";

const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const storedSurveyData = localStorage.getItem("surveyData");
    if (storedSurveyData) {
      const parsedSurveyData = JSON.parse(storedSurveyData);
      // setSurveyData(JSON.parse(storedSurveyData));
      console.log("Parsed survey data:", parsedSurveyData);
      setSurveyData(parsedSurveyData);
    }
  }, []);

  const updateSurveyData = (data) => {
    console.log("Updating survey data:", data); // Add this console.log statement
    setSurveyData(data);
    localStorage.setItem("surveyData", JSON.stringify(data));
  };

  return (
    <SurveyContext.Provider value={{ surveyData, updateSurveyData }}>
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyContext, SurveyProvider };
