from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from database import get_session
import CRUD
from schemas import TodoCreate, TodoUpdate, TodoResponse

# Initialize the router with a prefix and a tag for Swagger UI organization
router = APIRouter(
    prefix="/todos",
    tags=["Todos"]
)

@router.post("/", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
def create_todo_route(todo_data: TodoCreate, session: Session = Depends(get_session)):
    """
    Creates a new Todo item.
    """
    return CRUD.create_todo(session=session, todo_data=todo_data)

@router.get("/", response_model=list[TodoResponse])
def get_all_todos_route(session: Session = Depends(get_session)):
    """
    Retrieves all Todo items from the database.
    """
    return CRUD.get_todos(session=session)

@router.get("/{todo_id}", response_model=TodoResponse)
def get_single_todo_route(todo_id: int, session: Session = Depends(get_session)):
    """
    Retrieves a single Todo item by its ID.
    """
    db_todo = CRUD.get_todo(session=session, todo_id=todo_id)
    if not db_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )
    return db_todo

@router.patch("/{todo_id}", response_model=TodoResponse)
def update_todo_route(todo_id: int, todo_data: TodoUpdate, session: Session = Depends(get_session)):
    """
    Updates an existing Todo item with partial data.
    """
    db_todo = CRUD.update_todo(session=session, todo_id=todo_id, todo_data=todo_data)
    if not db_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )
    return db_todo

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo_route(todo_id: int, session: Session = Depends(get_session)):
    """
    Deletes a Todo item by its ID.
    """
    is_deleted = CRUD.delete_todo(session=session, todo_id=todo_id)
    if not is_deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )
    return None