'use client';

export default function EditForm({ isOpen, onClose, onSave, item, editingName, setEditingName }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingName.trim() === '') return;

    onSave({ ...item, name: editingName });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white p-4 rounded shadow-md w-96"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-lg font-semibold mb-2">Edit Item</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
