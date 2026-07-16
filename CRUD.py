from sqlmodel import Session, select
from models import Todo
from schemas import *
from typing import Sequence

def create_todo(session: Session, todo_data:TodoCreate):
    db_todo = Todo.model_validate(todo_data)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo


def get_todo(session: Session, todo_id: int) -> Todo | None:
    """Retrieves a single Todo by its ID."""
    return session.get(Todo, todo_id)


def get_todos(session: Session) -> Sequence[Todo]:
    """Retrieves all Todos from the database."""
    return session.exec(select(Todo)).all()


def update_todo(session: Session, todo_id: int, todo_data: TodoUpdate) -> Todo | None:
    """Updates an existing Todo with partial data."""

    # Explicitly declare the type to satisfy the type checker
    db_todo: Todo | None = session.get(Todo, todo_id)

    if not db_todo:
        return None

    update_dict = todo_data.model_dump(exclude_unset=True)

    for key, value in update_dict.items():
        setattr(db_todo, key, value)

    session.commit()
    session.refresh(db_todo)
    return db_todo


def delete_todo(session: Session, todo_id: int) -> bool:
    """Deletes a Todo by its ID. Returns True if deleted, False if not found."""
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        return False

    session.delete(db_todo)
    session.commit()
    return True

