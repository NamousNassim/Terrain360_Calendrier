from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import engine
from app.models import models
from app.api.routes import router
import os
from dotenv import load_dotenv

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Appointment Management System")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(router, prefix="/api")