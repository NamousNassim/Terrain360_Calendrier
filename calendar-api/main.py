from fastapi import FastAPI
from sqlmodel import SQLModel
from db_connection import engine
from routers import users, rendezvous, auth_router

app = FastAPI()

# @app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(users.router)
app.include_router(rendezvous.router)
app.include_router(auth_router.router)
