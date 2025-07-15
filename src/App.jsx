// App.jsx
import { useState } from 'react';
import HomeForm from './components/HomeForm';
import QuestionForm from './components/QuestionForm';
import Result from './components/Results';

function App() {
  const [step, setStep] = useState('home'); // "home", "question", or "result"
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: '',
  });

  const [questionData, setQuestionData] = useState(null); // Holds the question and answers
  const [selectedAnswer, setSelectedAnswer] = useState(''); // Holds the user's selected answer

  // Resets the app to the home screen
  const resetApp = () => {
    setFormData({ name: '', category: '', difficulty: '' });
    setQuestionData(null);
    setSelectedAnswer('');
    setStep('home');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-xl shadow-lg bg-white">
      {step === 'home' && (
        <HomeForm
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          setQuestionData={setQuestionData}
        />
      )}

      {step === 'question' && (
        <QuestionForm
          formData={formData}
          questionData={questionData}
          setQuestionData={setQuestionData}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          setStep={setStep}
        />
      )}

      {step === 'result' && (
        <Result
          name={formData.name}
          correctAnswer={questionData.correct_answer}
          selectedAnswer={selectedAnswer}
          resetApp={resetApp}
        />
      )}
    </div>
  );
}

export default App;
