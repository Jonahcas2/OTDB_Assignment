// components/HomeForm.jsx
import { useState } from 'react';

const categories = [
  { id: 9, name: 'General Knowledge' },
  { id: 17, name: 'Science & Nature' },
  { id: 23, name: 'History' },
  { id: 21, name: 'Sports' },
];

export default function HomeForm({ formData, setFormData, setStep, setQuestionData }) {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, difficulty } = formData;
    if (!name || !category || !difficulty) {
      setError('All fields are required!');
      return;
    }

    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await res.json();
      if (data.results.length === 0) throw new Error('No question found');
      setQuestionData(data.results[0]);
      setStep('question');
    } catch {
      setError('Failed to fetch question. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Trivia Challenge</h1>
      <p className="text-gray-600">Enter your name and select a category/difficulty to begin.</p>

      <div>
        <label className="block" htmlFor="name">First Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block" htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block" htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Start Quiz
      </button>
    </form>
  );
}
