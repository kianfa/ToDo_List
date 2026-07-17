
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import create_db_and_tables
from routers import todos

app = FastAPI(
    title="Todo API",
    description="Backend API for a To-Do list application.",
    version="0.1.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React development server (Create React App)
        "http://localhost:5173",  # React development server (Vite)
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, PATCH)
    allow_headers=["*"],  # Allows all request headers
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(todos.router)

@app.get("/")
def read_root():
    return {"status": "success", "message": "Todo API is operational."}