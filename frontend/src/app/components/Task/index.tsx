"use client";

import { ITask } from "../../types/task";
import { FormEventHandler, useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiCheck, FiDelete, FiX } from "react-icons/fi";
import Modal from "../../modals/BasicModal";

import { useAppContext } from "../../context/AppContext";
import { updateTaskAction, removeTaskAction } from "../../serverActions/Task";

interface TaskProps {
  noNum: number;
  task: ITask;
}

const Task = ({ noNum, task }: TaskProps) => {
  const { state, setState } = useAppContext();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask>(task);

  const updateTask = async (task: ITask) => {
    const updatedTask = await updateTaskAction(task);
    if (updatedTask) {
      const results = state.tasks.map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      );
      setState({ tasks: results }); // Update the state with the modified task
    } else {
      // Handle error case if needed
      console.error("Failed to update task");
    }
  };

  const removeTask = async (_id: string) => {
    const success = await removeTaskAction(_id);
    if (success) {
      const results = state.tasks.filter((task) => task._id !== _id);
      setState({ tasks: results }); // Update the state by removing the deleted task
    } else {
      // Handle the error case if needed
      console.error("Failed to delete task");
    }
  };

  const handleUpdateTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateTask({
      _id: taskToEdit._id,
      title: taskToEdit.title,
      deadline: taskToEdit.deadline,
      status: taskToEdit.status,
      createdAt: taskToEdit.createdAt,
      updatedAt: taskToEdit.updatedAt,
    });
    setOpenEditModal(false);
  };

  const handleUpdateStatus = async () => {
    await updateTask({
      _id: taskToEdit._id,
      title: taskToEdit.title,
      deadline: taskToEdit.deadline,
      status: !taskToEdit.status,
      createdAt: taskToEdit.createdAt,
      updatedAt: taskToEdit.updatedAt,
    });
    setTaskToEdit({ ...taskToEdit, status: !taskToEdit.status });
  };

  const handleDeleteTask = async (_id: string) => {
    await removeTask(_id);
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    setTaskToEdit(task);
  }, [task]);

  return (
    <tr key={noNum}>
      <td>{noNum}</td>
      <td className={`w-full ${task.status && "line-through"}`}>
        {task.title}
      </td>
      <td className={`w-full ${task.status && "line-through"}`}>
        {task.deadline}
      </td>
      <td className={`flex gap-5`}>
        <FiEdit
          cursor="pointer"
          className="text-blue-500"
          size={25}
          onClick={() => setOpenEditModal(true)}
        />
        <Modal openModal={openEditModal} setOpenModal={setOpenEditModal}>
          <form onSubmit={handleUpdateTask}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action flex flex-col">
              <input
                value={taskToEdit.title}
                type="text"
                name="title"
                placeholder="Type here"
                className="input input-bordered !m-2"
                onChange={(e) =>
                  setTaskToEdit({
                    ...taskToEdit,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                value={
                  new Date(taskToEdit.deadline).toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setTaskToEdit({
                    ...taskToEdit,
                    [e.target.name]: e.target.value,
                  })
                }
                type="date"
                name="deadline"
                placeholder="Type here"
                min={new Date(taskToEdit.deadline).toISOString().split("T")[0]}
                className="input input-bordered !m-2"
              />
              <button type="submit" className="btn !m-2">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        {task?.status ? (
          <FiX
            cursor="pointer"
            className="text-red-500"
            size={25}
            onClick={() => handleUpdateStatus()}
          />
        ) : (
          <FiCheck
            cursor="pointer"
            className="text-red-500"
            size={25}
            onClick={() => handleUpdateStatus()}
          />
        )}
        <FiTrash2
          cursor="pointer"
          className="text-red-500"
          size={25}
          onClick={() => setOpenDeleteModal(true)}
        />
        <Modal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button className="btn" onClick={() => handleDeleteTask(task._id)}>
              Yes
            </button>
            <button className="btn" onClick={() => setOpenDeleteModal(false)}>
              No
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
