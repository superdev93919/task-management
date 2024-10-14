from fastapi import FastAPI
from middlewares.cors import add_cors_middleware
from routes import task_routes

app = FastAPI()

# Add CORS middleware to the FastAPI app
add_cors_middleware(app)

# Include the task-related routes
app.include_router(task_routes.router)
