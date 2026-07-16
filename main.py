from fastapi import FastAPI
from database import create_db_and_tables
from routers import todos

app = FastAPI(
    title="Todo API",
    description="Backend API for a To-Do list application.",
    version="0.1.0"
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Register the Todo router
app.include_router(todos.router)

@app.get("/")
def read_root():
    return {"status": "success", "message": "Todo API is operational."}