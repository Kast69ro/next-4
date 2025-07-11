"use client";

import { API } from "@/config/utilits";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Table() {
  const [data, setData] = useState([]);
  const [addName, setAddName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [idx, setIdx] = useState(null);

  async function get() {
    try {
      let response = await axios.get(`${API}/api/categories`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get();
  }, []);

  async function deleteUser(id) {
    await axios.delete(`${API}/api/categories?id=${id}`);
    get();
  }

  async function addUser() {
    if (!addName.trim()) return;
    await axios.post(`${API}/api/categories`, { name: addName });
    get();
    setAddName("");
  }

  const handleEdit = (el) => {
    setEditModal(true);
    setEditName(el.name);
    setIdx(el.id);
  };

  async function editUser() {
    if (!editName.trim()) return;
    await axios.put(`${API}/api/categories`, { name: editName, id: idx });
    get();
    setEditModal(false);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Add Form */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
          placeholder="Enter name"
          className="border rounded px-4 py-2 w-full"
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr key={el.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{el.id}</td>
              <td className="border px-4 py-2">{el.name}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => deleteUser(el.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(el)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
          onClick={() => setEditModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border px-4 py-2 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={editUser}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
