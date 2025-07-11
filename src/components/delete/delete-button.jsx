'use client';

export default function DeleteButton({ id, onDelete }) {
  return (
    <button
      onClick={() => onDelete(id)}
      className="text-red-500 hover:underline"
    >
      delete
    </button>
  );
}
