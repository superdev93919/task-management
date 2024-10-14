from pydantic import BaseModel

class TaskModel(BaseModel):
    """
    Task model representing the structure of a to-do item.

    Attributes:
        title (str): The title or description of the task.
        deadline (str): The deadline for the task in string format (could be a date or time).
        status (bool): The completion status of the task, where True represents completed and False represents incomplete.
    """
    title: str
    deadline: str
    status: bool
