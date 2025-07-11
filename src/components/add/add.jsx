'use client';

import { useState } from 'react';

export default function AddForm({ onAdd }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;

    const newItem = {
      id: Date.now().toString(), 
      name,
    };

    onAdd(newItem);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className="border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}
