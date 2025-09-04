from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.config.database import Base
from datetime import datetime

class Agent(Base):
    __tablename__ = "agents"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    password_hash = Column(String(255))
    appointments = relationship("Appointment", back_populates="agent")

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(100), index=True)
    notes = Column(Text, nullable=True)
    location = Column(String(255))
    contact_email = Column(String(100))
    contact_phone = Column(String(20))
    appointments = relationship("Appointment", back_populates="company")

class Appointment(Base):
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    agent_id = Column(Integer, ForeignKey("agents.id"))
    appointment_time = Column(DateTime, default=datetime.utcnow)
    status = Column(String(20), default="scheduled")
    
    company = relationship("Company", back_populates="appointments")
    agent = relationship("Agent", back_populates="appointments")