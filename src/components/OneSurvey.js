import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { SurveyContext } from '../lib/SurveyContext';

const SingleSurvey = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const { surveyData } = useContext(SurveyContext);
  const survey = surveyData.find(survey => survey.id === Number(id));

  if (!survey) {
    return <div>Survey not found</div>;
  }

  const steps = survey.steps;
  const questions = survey.questions;

  const goToNextStep = () => {
    if (currentStep < steps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentStep]: {
        ...prevAnswers[currentStep],
        [name]: value,
      },
    }));
  };

  const currentStepQuestions = questions.filter(question => question.step === currentStep);

  // const handleSubmit = () => {
  //   // Display submitted answers in the console
  //   console.log('Submitted Answers:', answers);
  // };

  const handleSubmit = () => {
    console.log('Submitted Answers:');
    currentStepQuestions.forEach((question, questionIndex) => {
      console.log(`${questionIndex + 1}. ${question.text}`);
      console.log(`Answer: ${answers[currentStep]?.[`text-${questionIndex}`] || 'N/A'}`);
      if (question.type === 'radio') {
        console.log('Options:');
        question.options.forEach((option, optionIndex) => {
          console.log(`${optionIndex + 1}. ${option}`);
          console.log(`Selected: ${answers[currentStep]?.[`radio-${questionIndex}`] === option}`);
        });
      } else if (question.type === 'checkbox') {
        console.log('Options:');
        question.options.forEach((option, optionIndex) => {
          console.log(`${optionIndex + 1}. ${option}`);
          console.log(`Selected: ${answers[currentStep]?.[`checkbox-${questionIndex}-${optionIndex}`]}`);
        });
      }
      console.log('---');
    });
  };
  

  return (
    <div>
      <Navbar />
      <h2>Survey Details</h2>
      <h3>Survey Form Name: {survey.formName}</h3>
      <h3>Step {currentStep + 1} of {steps}</h3>
      {currentStepQuestions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <p>{questionIndex + 1}. {question.text}</p>
          {question.type === 'text' ? (
            <input
              type="text"
              placeholder="Enter your answer"
              name={`text-${questionIndex}`}
              value={answers[currentStep]?.[`text-${questionIndex}`] || ''}
              onChange={handleInputChange}
            />
          ) : question.type === 'radio' ? (
            <div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    name={`radio-${questionIndex}`}
                    value={option}
                    checked={answers[currentStep]?.[`radio-${questionIndex}`] === option}
                    onChange={handleInputChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ) : question.type === 'checkbox' ? (
            <div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="checkbox"
                    name={`checkbox-${questionIndex}-${optionIndex}`}
                    value={option}
                    checked={answers[currentStep]?.[`checkbox-${questionIndex}-${optionIndex}`]}
                    onChange={handleInputChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
      <button onClick={goToPrevStep} disabled={currentStep === 0} style={{ marginTop: "20px" }}>Previous Step</button>
      <button onClick={goToNextStep} disabled={currentStep === steps - 1} style={{ margin: "20px 0 0 20px" }}>Next Step</button>
      {currentStep === steps - 1 && <button onClick={handleSubmit} style={{ margin: "20px 0 0 20px" }}>Submit Survey</button>}
    </div>
  );
};

export default SingleSurvey;