"use client"
import { useState } from 'react';

interface TodoItemProps {
  text: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    // Play sound when checked
    if (!isChecked) {
      const audio = new Audio('/celebration.mp3');
      audio.play();

      // Trigger celebration animation
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];
    const confettiCount = 100;
  
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
  
      // Randomize color
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
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md">
      <span className={`text-lg ${isChecked ? 'line-through text-gray-400' : ''}`}>
        {text}
      </span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-green-500 border-gray-300 rounded"
      />
    </div>
  );
};

export default TodoItem;
