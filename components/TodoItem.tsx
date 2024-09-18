"use client";
import { useState } from 'react';

const flowers = ['🌱', '🌷', '🌼', '🌻','🌸','🪻'];
const todos = ['First todo', 'Second todo', 'Third todo', 'Fourth todo', 'Fifth todo', 'sixth todo'];

const TodoItem: React.FC = () => {
  const [currentTodoIndex, setCurrentTodoIndex] = useState(0);
  const [checkedCount, setCheckedCount] = useState(2);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    if (!isChecked) {
      setCheckedCount((prev) => Math.min(prev + 1, flowers.length));
      
      const audio = new Audio('/celebration.mp3');
      audio.play();
      
      triggerCelebration();

      setTimeout(() => {
        setCurrentTodoIndex((prevIndex) => prevIndex + 1);
        setIsChecked(false); 
      }, 1000); 
    }
  };

  const triggerCelebration = () => {
    const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // Randomize position
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = `${Math.random() * 100}vh`;

      // Randomize size
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 20 + 10}px`;

      // Add to the DOM
      document.body.appendChild(confetti);

      // Remove after animation
      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 3000);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      {currentTodoIndex < todos.length ? (
        <div className="flex w-[500px] justify-between p-4 border rounded-lg shadow-md mb-4">
          <span className="text-lg">
            {todos[currentTodoIndex]}
          </span>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              setIsChecked(true);
              handleCheckboxChange();
            }}
            className="w-6 h-6 text-green-500 border-gray-300 rounded"
          />
        </div>
      ) : (
        <div className="p-4 text-lg text-center">All todos are completed!</div>
      )}

      <div className='grid grid-cols-6 gap-2 mt-4'>
        {flowers.slice(0, checkedCount).map((flower, index) => (
          <div key={index} className="flex items-center justify-center w-16 h-16 border rounded-md">
            <span className="text-2xl">{flower}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoItem;
