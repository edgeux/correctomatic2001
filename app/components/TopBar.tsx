"use client";
// app/components/TopBar.tsx
import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { MdContrast } from 'react-icons/md';

export default function TopBar() {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const toggleLargeText = () => setLargeText(!largeText);

  return (
    <div className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800">
      <div>
        <button onClick={toggleHighContrast} className="mr-4">
          <MdContrast size={24} />
        </button>
        <button onClick={toggleLargeText}>
          <span className="text-xl">T<sup>+</sup></span>
        </button>
      </div>
      <button>
        <FiSettings size={24} />
      </button>
    </div>
  );
}
