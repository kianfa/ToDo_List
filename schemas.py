from pydantic import BaseModel

# schema for creating a new item (a new Todo)
class TodoCreate(BaseModel):
    title: str
    description: str
    completed: bool


# schema for creating modifying an old todo
class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None


class TodoResposnse(BaseModel):
    id: int
    title: str
    description: str | None
    completed: bool
