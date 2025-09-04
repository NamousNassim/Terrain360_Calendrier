from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    username: str
    email: str

class TokenData(BaseModel):
    username: str | None = None

# Agent schemas
class AgentBase(BaseModel):
    username: str
    email: EmailStr

class AgentCreate(AgentBase):
    password: str

class Agent(AgentBase):
    id: int
    
    class Config:
        from_attributes = True

# Company schemas
class CompanyBase(BaseModel):
    client_name: str
    notes: Optional[str] = None
    location: str
    contact_email: EmailStr
    contact_phone: str

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: int
    
    class Config:
        from_attributes = True

# Appointment schemas
class AppointmentBase(BaseModel):
    appointment_time: datetime
    status: str = "a faire"

class AppointmentCreate(AppointmentBase):
    company_id: int
    # agent_id will be set from the authenticated user

class Appointment(AppointmentBase):
    id: int
    company: Company
    agent: Agent
    
    class Config:
        from_attributes = True

class AppointmentStatusUpdate(BaseModel):
    status: str

# Response schemas
class Message(BaseModel):
    detail: str