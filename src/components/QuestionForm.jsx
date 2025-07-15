import { useState, useEffect } from "react";

function QuestionForm({ 
  questionData, 
  selectedAnswer, 
  setSelectedAnswer, 
  setStep 
}) {
  const [error, setError] = useState("");
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    if (!questionData) return;
    const answers = [...questionData.incorrect_answers, questionData.correct_answer];
    setShuffledAnswers(answers.sort(() => 0.5 - Math.random()));
  }, [questionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedAnswer) {
      setError("Please select an answer.");
      return;
    }
    setStep("result");
  };

  if (!questionData) return <p>Loading question...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Question:</h2>
      <p>{decodeURIComponent(questionData.question)}</p>

      <div className="space-y-2">
        {shuffledAnswers.map((answer, index) => (
          <label key={index} className="block">
            <input 
              type="radio"
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="mr-2"
            />
            {decodeURIComponent(answer)}
          </label>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit Answer
      </button>
    </form>
  );
}

export default QuestionForm;