// app/page.tsx
"use client";

import { useState } from 'react';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { sendMessage } from './api';

type Output = {
  text: string;
};

export default function Home() {
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [conversationId, setConversationId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (text: string) => {
    setLoading(true); // Start loading
    try {
      const response = await sendMessage(text, conversationId);
      const { answer, conversation_id } = response;

      console.log("Updating outputs with answer:", answer);

      setOutputs([...outputs, { text: answer }]);
      setConversationId(conversation_id);

      // Copy the corrected text to the clipboard
      navigator.clipboard.writeText(answer).then(() => {
        console.log("Text copied to clipboard");
      }).catch(err => {
        console.error("Failed to copy text to clipboard:", err);
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again."); // Provide user-friendly feedback
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCopy = (index: number) => {
    navigator.clipboard.writeText(outputs[index].text);
  };

  const handleSpeak = (index: number) => {
    const utterance = new SpeechSynthesisUtterance(outputs[index].text);
    speechSynthesis.speak(utterance);
  };

  const handleEdit = (index: number) => {
    // Implement edit functionality
  };

  const handleUndo = (index: number) => {
    // Implement undo functionality
  };

  const handleDelete = (index: number) => {
    setOutputs(outputs.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4">
        <OutputSection
          outputs={outputs}
          loading={loading} // Pass loading state to OutputSection
          onCopy={handleCopy}
          onSpeak={handleSpeak}
          onEdit={handleEdit}
          onUndo={handleUndo}
          onDelete={handleDelete}
        />
      </div>
      <InputSection onSubmit={handleSubmit} />
    </div>
  );
}
