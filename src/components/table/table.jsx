'use client';

import { useState } from "react";
import EditModal from "../edit/edit";
import AddForm from "../add/add";
import DeleteButton from "../delete/delete-button";

export default function Table() {
    
  const [data, setData] = useState([
    { id: "1", name: "kastro" },
    { id: "2", name: "bot" }
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setData(prev => prev.filter(el => el.id !== id));
  };

  const handleAdd = (newItem) => {
    setData(prev => [...prev, newItem]);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditingName(item.name);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedItem) => {
    setData(prev =>
      prev.map(el => (el.id === updatedItem.id ? updatedItem : el))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <AddForm onAdd={handleAdd} />

      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr key={el.id}>
              <td className="border px-4 py-2">{el.id}</td>
              <td className="border px-4 py-2">{el.name}</td>
              <td className="border px-4 py-2 space-x-2">
                <DeleteButton id={el.id} onDelete={handleDelete} />
                <button
                  onClick={() => handleEditClick(el)}
                  className="text-blue-500 hover:underline"
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
        item={editingItem}
        editingName={editingName}
        setEditingName={setEditingName}
      />
    </div>
  );
}
