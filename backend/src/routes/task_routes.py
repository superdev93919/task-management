from fastapi import APIRouter, HTTPException, status
from repositories.task_repository import TaskRepository
from schemas.task_schema import TaskCreate, TaskResponse
from models.task_model import TaskModel
from bson import ObjectId

router = APIRouter()

@router.post("/api/tasks")
async def create_task(task: TaskCreate):
    """
    Create a new task.

    Args:
        task (TaskCreate): The task data to create.

    Returns:
        TaskModel: The newly created task from the database.
    """
    task_model = TaskModel(**task.model_dump())
    created_task = await TaskRepository.create_task(task_model)
    return created_task


@router.get("/api/tasks")
async def get_tasks():
    """
    Retrieve all tasks.

    Returns:
        List[TaskModel]: A list of all tasks from the database.
    """
    return await TaskRepository.get_all_tasks()


@router.get("/api/tasks/{task_id}")
async def get_task(task_id: str):
    """
    Retrieve a task by its ID.

    Args:
        task_id (str): The ID of the task to retrieve.

    Returns:
        TaskResponse: The task data if found.

    Raises:
        HTTPException: 404 error if the task is not found.
    """
    task = await TaskRepository.get_task_by_id(task_id)
    if task:
        return TaskResponse(**task.model_dump())
    raise HTTPException(status_code=404, detail="Task not found")


@router.put("/api/tasks/{task_id}")
async def update_task(task_id: str, task: TaskCreate):
    """
    Update an existing task by its ID.

    Args:
        task_id (str): The ID of the task to update.
        task (TaskCreate): The updated task data.

    Returns:
        TaskModel: The updated task if successful.

    Raises:
        HTTPException: 404 error if the task is not found.
    """
    existing_task = await TaskRepository.get_task_by_id(task_id)
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
    updated_task = await TaskRepository.update_task(task_id, task.model_dump())
    return updated_task


@router.delete("/api/tasks/{task_id}")
async def delete_task(task_id: str):
    """
    Delete a task by its ID.

    Args:
        task_id (str): The ID of the task to delete.

    Returns:
        dict: A dictionary indicating whether the deletion was successful.

    Raises:
        HTTPException: 404 error if the task is not found.
    """
    existing_task = await TaskRepository.get_task_by_id(task_id)
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
    ok = await TaskRepository.delete_task(task_id)
    return {"ok": ok}
