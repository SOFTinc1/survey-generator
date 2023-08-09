import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { SurveyContext } from '../lib/SurveyContext';

const CreateSurvey = () => {
  const { updateSurveyData } = useContext(SurveyContext);

  const [formName, setFormName] = useState('');
  const [numSteps, setNumSteps] = useState(1);
  const [questions, setQuestions] = useState([]);

  const handleCreateSurvey = () => {
    const newSurvey = {
      formName,
      id: Date.now(),
      steps: numSteps,
      questions: [...questions], // Copy questions to new array
    };

    updateSurveyData([...surveys, newSurvey]);
  };

  const surveys = useContext(SurveyContext).surveyData;

  return (
    <div>
      <Navbar />
      <h2>Create a New Survey</h2>
      <label>
        Survey Form Name:
        <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} />
      </label>
      <label>
        Number of Steps:
        <input type="number" value={numSteps} onChange={(e) => setNumSteps(parseInt(e.target.value))} />
      </label>
      {Array.from({ length: numSteps }).map((_, stepIndex) => (
        <div key={stepIndex}>
          <h3>Step {stepIndex + 1}</h3>
          {questions.map((question, questionIndex) => (
            question.step === stepIndex && (
              <div key={questionIndex}>
                <label>
                  Question Text:
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[questionIndex].text = e.target.value;
                      setQuestions(updatedQuestions);
                    }}
                  />
                </label>
                <label>
                  Question Type:
                  <select
                    value={question.type}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[questionIndex].type = e.target.value;
                      setQuestions(updatedQuestions);
                    }}
                  >
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                  </select>
                </label>
                {question.type === 'radio' || question.type === 'checkbox' ? (
                  <div>
                    <label>Options:</label>
                    {question.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                    ))}
                    <button
                      onClick={() => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[questionIndex].options.push('');
                        setQuestions(updatedQuestions);
                      }}
                    >
                      Add Option
                    </button>
                  </div>
                ) : null}
              </div>
            )
          ))}
          <button onClick={() => setQuestions([...questions, { text: '', type: 'text', step: stepIndex, options: [] }])}>Add Question</button>
        </div>
      ))}
      <button onClick={handleCreateSurvey}>Create Survey</button>
    </div>
  );
};

export default CreateSurvey;