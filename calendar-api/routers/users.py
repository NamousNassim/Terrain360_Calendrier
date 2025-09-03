# users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from db_connection import get_session
from models import User as UserModel  # SQLAlchemy model
from schemas import User, UserCreate  # Pydantic schemas
from utils.auth import hash_password, require_role, get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

# Create user
@router.post("/", response_model=User)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    # Check if username exists
    db_user = session.query(UserModel).filter(UserModel.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # Map Pydantic schema to SQLAlchemy model
    db_user = UserModel(
        username=user.username,
        password=hash_password(user.password),
        role=user.role
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

# List all users
@router.get("/", response_model=List[User])
def list_users(session: Session = Depends(get_session)):
    users = session.query(UserModel).all()
    return users

# Get user by ID
@router.get("/{user_id}", response_model=User)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Delete user
@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: dict = Depends(require_role("Superviseur"))  # Only Superviseur can delete users
):
    user = session.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {"ok": True}
