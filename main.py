from fastapi import FastAPI

app = FastAPI(
    title="Todo API",
    description="Backend API for a To-Do list application using FastAPI and Supabase.",
    version="1.0.0"
)


@app.get("/")
def read_root():
    return {"status": "success", "message": "Todo API is operational."}