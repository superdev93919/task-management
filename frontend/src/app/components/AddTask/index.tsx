"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../modals/BasicModal";

import { useAppContext } from "../../context/AppContext";
import { createTaskAction } from "../../serverActions/Task";

const defaultForm = {
  title: "",
  deadline: new Date().toISOString().split("T")[0],
  status: false,
  createdAt: "",
  updatedAt: "",
};

const AddTask = () => {
  const router = useRouter();
  const { setState } = useAppContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [formData, setFormData] = useState(defaultForm);

  const handleOpenModal = () => {
    setFormData({
      title: "",
      deadline: new Date().toISOString().split("T")[0],
      status: false,
      createdAt: "",
      updatedAt: "",
    });
    setOpenModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = {
      _id: "-1",
      title: formData.title,
      deadline: new Date(formData.deadline).toISOString().split("T")[0],
      status: false,
      createdAt: "",
      updatedAt: "",
    };

    const newTask = await createTaskAction(task);
    if (newTask) {
      setState((prev) => ({ tasks: [...prev.tasks, newTask] })); // Add the new task to the state
    } else {
      // Handle the error case if necessary
      console.error("Failed to create task");
    }
    setFormData(defaultForm);
    setOpenModal(false);
    router.refresh();
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="btn btn-primary w-full">
        Add new task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create New Task
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
              >
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                value={new Date(formData.deadline).toISOString().split("T")[0]}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
            >
              Create
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddTask;
