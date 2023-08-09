// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateSurvey from "./pages/CreateSurvey";
import ViewSurveys from "./pages/ViewSurveys";
import SingleSurvey from "./components/OneSurvey";

import { SurveyProvider } from "./lib/SurveyContext";

const App = () => {
  return (
    <div>
      <SurveyProvider>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/create-survey" element={<CreateSurvey />} />
          <Route path="/view-surveys" element={<ViewSurveys />} />
          <Route path="/survey/:id/:step" element={<SingleSurvey />} />
          <Route path="/survey/:id" element={<SingleSurvey />} />
        </Routes>
      </SurveyProvider>
    </div>
  );
};

export default App;
