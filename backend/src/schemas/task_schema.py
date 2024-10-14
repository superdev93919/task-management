from pydantic import BaseModel

class TaskCreate(BaseModel):
    """
    Schema for creating a new task.

    Attributes:
        title (str): The title or description of the task.
        deadline (str): The deadline for the task (in string format, typically a date or time).
        status (bool): The status of the task, where True means completed and False means incomplete.
    """
    title: str
    deadline: str
    status: bool

class TaskResponse(TaskCreate):
    _id: str
