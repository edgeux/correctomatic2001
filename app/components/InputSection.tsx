// app/components/InputSection.tsx
"use client";

import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function InputSection({ onSubmit }: { onSubmit: (inputText: string) => void }) {
  const [inputText, setInputText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSubmit(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 flex items-center">
      <form onSubmit={handleSubmit} className="flex flex-1">
        <textarea
          value={inputText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 mr-2 rounded"
          placeholder="Type your message here and press Enter to send..."
        />
        <button type="submit">
          <FiSend size={24} />
        </button>
      </form>
    </div>
  );
}
