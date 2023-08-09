import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { SurveyContext } from "../lib/SurveyContext";
import { Link } from "react-router-dom";

const ViewSurveys = () => {
  const { surveyData } = useContext(SurveyContext);

  return (
    <div>
      <Navbar />
      <h2>View All Created Surveys</h2>
      <ul>
        {surveyData.map((survey) => (
          <li key={survey.id}>
            <Link to={`/survey/${survey.id}`}>{survey.formName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSurveys;
