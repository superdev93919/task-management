"use client";

import React, { useEffect, useState } from "react";

import Task from "../../components/Task";

import { useAppContext } from "../../context/AppContext";
import { fetchAllTasksAction } from "../../serverActions/Task";

const TaskListContainer = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const { state, setState } = useAppContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetchAllTasksAction();
      setState({ tasks: res });
    };

    fetchTasks();
  }, [setState]);

  return (
    <div className="overflow-x-auto flex flex-col">
      <div className="flex justify-between">
        <div className="flex my-4">
          <div className="flex mr-10">
            <h3 className="mr-4">Completed Tasks: </h3>
            <h2 className="text-purple-700 font-bold">
              {state?.tasks?.filter((task) => task.status === true).length}
            </h2>
          </div>
          <div className="flex">
            <h3 className="mr-4">Completed Tasks: </h3>
            <h2 className="text-red-700 font-bold">
              {state?.tasks?.filter((task) => task.status === false).length}
            </h2>
          </div>
        </div>
        <div className="flex my-4 cursor-pointer">
          <h3>Sort By Title : </h3>
          <select
            name="sort"
            id="sort"
            className="cursor-pointer"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
      </div>
      <table className="table w-full text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state &&
            state.tasks &&
            state.tasks
              .sort((a, b) => {
                if (a.deadline > b.deadline) {
                  if (sortOrder === "asc") return 1;
                  return -1;
                }
                if (a.deadline < b.deadline) {
                  if (sortOrder === "asc") return -1;
                  return 1;
                }
                return 0;
              })
              .map((task, index) => (
                <Task key={index} noNum={index + 1} task={task} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListContainer;
