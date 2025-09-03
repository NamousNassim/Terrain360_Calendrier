from pydantic import BaseModel
from enum import Enum
from datetime import date
from typing import List, Optional
from datetime import date

class RoleEnum(str, Enum):
    supervisor = "supervisor"
    enqueteur = "enqueteur"

class RendezVousBase(BaseModel):
    date: date
    hour: int
    minute: int

class RendezVousCreate(RendezVousBase):
    user_id: Optional[int]

class RendezVous(RendezVousBase):
    id: int
    user_id: Optional[int]

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    username: str
    role: RoleEnum

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    rendezvous: List[RendezVous] = []

    class Config:
        from_attributes = True


class RendezVousBase(BaseModel):
    date: date
    hour: int
    minute: int

class RendezVousCreate(RendezVousBase):
    user_id: Optional[int]

class RendezVous(RendezVousBase):
    id: int
    user_id: Optional[int]

    class Config:
        from_attributes = True

