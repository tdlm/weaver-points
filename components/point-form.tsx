"use client";

import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
}

const questions: Question[] = [
  { id: 1, text: 'Is it well-defined and small?' },
  { id: 2, text: 'Does it have minor complexity or testing?' },
  { id: 3, text: 'Multiple steps, moderate testing, or coordination?' },
  { id: 4, text: 'Is there a learning curve, multiple systems, or envs?' },
  { id: 5, text: 'Is it exploratory, ambiguous, or has external blockers?' },
  { id: 6, text: 'Are there unknowns or risk of rabbit holes?' },
];

const calculatePoints = (answers: boolean[]): string => {
  if (answers[5]) return '8-13';
  if (answers[4]) return '8-13';
  if (answers[3]) return '5-8';
  if (answers[2]) return '5';
  if (answers[1]) return '3';
  if (answers[0]) return '1-2';
  return 'Uncertain';
};

export default function App(): JSX.Element {
  const [answers, setAnswers] = useState<boolean[]>(Array(questions.length).fill(false));

  const toggleAnswer = (index: number): void => {
    const updated = [...answers];
    updated[index] = !updated[index];
    setAnswers(updated);
  };

  const suggestedPoints: string = calculatePoints(answers);

  return (
    <div className="max-w-xl mx-auto p-4 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Story Point Estimator</h1>
      {questions.map((q, index) => (
        <div key={q.id} className="mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={answers[index]}
              onChange={() => toggleAnswer(index)}
            />
            {q.text}
          </label>
        </div>
      ))}

      <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-600">
        <strong className="block text-lg text-blue-800 dark:text-blue-300">Suggested Story Points:</strong>
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{suggestedPoints}</span>
      </div>
    </div>
  );
}