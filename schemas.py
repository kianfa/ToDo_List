from pydantic import BaseModel

# schema for creating a new item (a new Todo)
class TodoCreate(BaseModel):
    title: str
    description: str | None = None  # <-- Now it accepts null/None!
    completed: bool = False


# schema for creating modifying an old todo
class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None


class TodoResponse(BaseModel):
    id: int
    title: str
    description: str | None
    completed: bool
