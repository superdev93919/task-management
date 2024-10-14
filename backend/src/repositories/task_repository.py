from bson import ObjectId
from models.task_model import TaskModel
from core.config import db
from typing import List, Dict, Optional

def format_task(task: dict) -> dict:
    """
    Format the task by converting the ObjectId to a string.

    Args:
        task (dict): A dictionary representing a task from the database.

    Returns:
        dict: The formatted task with the ObjectId as a string.
    """
    task['_id'] = str(task['_id'])
    return task


class TaskRepository:
    """
    Repository class for handling CRUD operations related to tasks.
    """

    @staticmethod
    async def create_task(task: TaskModel) -> TaskModel:
        """
        Creates a new task in the database.

        Args:
            task (TaskModel): The task model containing task data to insert.

        Returns:
            TaskModel: The created task fetched from the database with the inserted ID.
        """
        result = await db['tasks'].insert_one(task.model_dump())
        return await TaskRepository.get_task_by_id(str(result.inserted_id))


    @staticmethod
    async def get_all_tasks() -> List[TaskModel]:
        """
        Retrieves all tasks from the database.

        Returns:
            List[TaskModel]: A list of all tasks in the database, formatted as TaskModel instances.
        """
        tasks = await db['tasks'].find().to_list(1000)
        return [format_task(task) for task in tasks]


    @staticmethod
    async def get_task_by_id(task_id: str) -> Optional[TaskModel]:
        """
        Retrieves a single task by its ID.

        Args:
            task_id (str): The ID of the task to retrieve.

        Returns:
            Optional[TaskModel]: The task if found, otherwise None.
        """
        task = await db['tasks'].find_one({"_id": ObjectId(task_id)})
        if task:
            return format_task(task)
        return None


    @staticmethod
    async def update_task(task_id: str, task_data: Dict) -> Optional[TaskModel]:
        """
        Updates a task in the database with the given data.

        Args:
            task_id (str): The ID of the task to update.
            task_data (Dict): A dictionary containing the updated task data.

        Returns:
            Optional[TaskModel]: The updated task if successful, otherwise None.
        """
        await db['tasks'].update_one({"_id": ObjectId(task_id)}, {"$set": task_data})
        return await TaskRepository.get_task_by_id(task_id)


    @staticmethod
    async def delete_task(task_id: str) -> bool:
        """
        Deletes a task by its ID.

        Args:
            task_id (str): The ID of the task to delete.

        Returns:
            bool: True if the task was deleted, False otherwise.
        """
        result = await db['tasks'].delete_one({"_id": ObjectId(task_id)})
        return result.deleted_count > 0
