from sqlmodel import Session, select
from models import Todo
from schemas import *

def CreateTodo(session: Session, todo_data:TodoCreate):
    db_todo = Todo.model_validate(todo_data)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo