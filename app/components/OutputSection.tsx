// app/components/OutputSection.tsx
"use client";

import { FiCopy, FiEdit, FiTrash2, FiUndo } from 'react-icons/fi';

type Output = {
  text: string;
};

export default function OutputSection({
  outputs,
  loading,
  onCopy,
  onSpeak,
  onEdit,
  onUndo,
  onDelete,
}: {
  outputs: Output[];
  loading: boolean;
  onCopy: (index: number) => void;
  onSpeak: (index: number) => void;
  onEdit: (index: number) => void;
  onUndo: (index: number) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <div>
      {outputs.map((output, index) => (
        <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded shadow mb-4">
          <p>{output.text}</p>
          <div className="flex space-x-2 mt-2">
            <button onClick={() => onCopy(index)}>
              <FiCopy size={20} />
            </button>
            <button onClick={() => onSpeak(index)}>
              <FiEdit size={20} />
            </button>
            <button onClick={() => onUndo(index)}>
              <FiUndo size={20} />
            </button>
            <button onClick={() => onDelete(index)}>
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>
      ))}
      {loading && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow mb-4 flex justify-center">
          <div className="loader"></div> {/* Add your spinner or loader component here */}
        </div>
      )}
    </div>
  );
}
