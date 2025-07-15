// components/Result.jsx
export default function Results({ name, correctAnswer, selectedAnswer, resetApp }) {
  const isCorrect = correctAnswer === selectedAnswer;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {isCorrect
          ? `Great job, ${name}! You got it right!`
          : `Sorry, ${name}, that was incorrect.`}
      </h2>
      {!isCorrect && (
        <p>
          The correct answer was: <strong>{decodeURIComponent(correctAnswer)}</strong>
        </p>
      )}
      <button onClick={resetApp} className="bg-purple-600 text-white px-4 py-2 rounded">
        Try Another Question
      </button>
    </div>
  );
}
