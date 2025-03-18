"use client";

import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
}

const questions: Question[] = [
  { id: 1, text: 'Is it well-defined and small?' },
  { id: 2, text: 'Does it require a deployment?' },
  { id: 3, text: 'Does it have minor complexity or testing?' },
  { id: 4, text: 'Multiple steps, moderate testing, or coordination?' },
  { id: 5, text: 'Is there a learning curve, multiple systems, or envs?' },
  { id: 6, text: 'Is it exploratory, ambiguous, or has external blockers?' },
  { id: 7, text: 'Are there unknowns or risk of rabbit holes?' },
  { id: 8, text: 'Does it include performance testing or benchmarking?' }
];

const calculatePoints = (answers: boolean[]): string => {
  let basePoints = 0;

  if (answers[6]) basePoints = 8; // unknowns/rabbit holes
  else if (answers[5]) basePoints = 8; // exploratory/ambiguous
  else if (answers[4]) basePoints = 5; // learning curve / multi-env
  else if (answers[3]) basePoints = 5; // multiple steps
  else if (answers[2]) basePoints = 3; // minor complexity
  else if (answers[0] && !answers[1]) basePoints = 1; // well-defined & no deploy
  else basePoints = 2; // general fallback for defined but deployable task

  if (answers[7]) basePoints += 1; // performance testing adds weight

  if (basePoints <= 1) return '1';
  if (basePoints === 2) return '2';
  if (basePoints === 3) return '3';
  if (basePoints === 4) return '3-5';
  if (basePoints === 5) return '5';
  if (basePoints === 6) return '5-8';
  if (basePoints === 7) return '8';
  if (basePoints >= 8) return '8-13';

  return 'Uncertain';
};

export default function App() {
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