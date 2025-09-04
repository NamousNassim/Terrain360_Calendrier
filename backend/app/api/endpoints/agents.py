from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta

from app.config.database import get_db
from app.schemas.schemas import Agent, AgentCreate, Token
from app.models.models import Agent as AgentModel
from app.utils.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter(
    prefix="/agents",
    tags=["agents"]
)
@router.post("/login", response_model=Token)
async def login_agent(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    agent = db.query(AgentModel).filter(
        AgentModel.username == form_data.username
    ).first()
    
    if not agent or not verify_password(form_data.password, agent.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": agent.username},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": agent.username,
        "email": agent.email
    }
@router.post("/", response_model=Agent, status_code=status.HTTP_201_CREATED)
def create_agent(agent: AgentCreate, db: Session = Depends(get_db)):
    # Check if username already exists
    db_agent = db.query(AgentModel).filter(
        AgentModel.username == agent.username
    ).first()
    if db_agent:
        raise HTTPException(
            status_code=400,
            detail="Username already registered"
        )
    
    # Check if email already exists
    db_agent = db.query(AgentModel).filter(
        AgentModel.email == agent.email
    ).first()
    if db_agent:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Create new agent with hashed password
    db_agent = AgentModel(
        username=agent.username,
        email=agent.email,
        password_hash=get_password_hash(agent.password)
    )
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent