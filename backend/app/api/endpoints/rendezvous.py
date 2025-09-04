from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db
from app.schemas.schemas import Appointment, AppointmentCreate
from app.models.models import Appointment as AppointmentModel, Agent as AgentModel
from app.utils.security import get_current_agent

router = APIRouter(
    prefix="/appointments",
    tags=["appointments"]
)

@router.post("/", response_model=Appointment, status_code=status.HTTP_201_CREATED)
def create_appointment(
    appointment: AppointmentCreate, 
    db: Session = Depends(get_db),
    current_agent: AgentModel = Depends(get_current_agent)
):
    # Ensure the appointment is created for the current agent
    db_appointment = AppointmentModel(
        company_id=appointment.company_id,
        agent_id=current_agent.id,  # Use current agent's ID
        appointment_time=appointment.appointment_time,
        status=appointment.status
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@router.get("/", response_model=List[Appointment])
def read_appointments(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_agent: AgentModel = Depends(get_current_agent)
):
    # Only return appointments for the current agent
    appointments = db.query(AppointmentModel)\
        .filter(AppointmentModel.agent_id == current_agent.id)\
        .order_by(AppointmentModel.appointment_time.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()
    return appointments

@router.get("/{appointment_id}", response_model=Appointment)
def read_appointment(
    appointment_id: int, 
    db: Session = Depends(get_db),
    current_agent: AgentModel = Depends(get_current_agent)
):
    appointment = db.query(AppointmentModel)\
        .filter(
            AppointmentModel.id == appointment_id,
            AppointmentModel.agent_id == current_agent.id  # Security check
        )\
        .first()
    
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@router.put("/{appointment_id}", response_model=Appointment)
def update_appointment(
    appointment_id: int, 
    appointment: AppointmentCreate, 
    db: Session = Depends(get_db),
    current_agent: AgentModel = Depends(get_current_agent)
):
    db_appointment = db.query(AppointmentModel)\
        .filter(
            AppointmentModel.id == appointment_id,
            AppointmentModel.agent_id == current_agent.id  # Security check
        )\
        .first()
    
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Update fields (excluding agent_id to prevent changes)
    update_data = appointment.dict(exclude={'agent_id'})
    for key, value in update_data.items():
        setattr(db_appointment, key, value)
    
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(
    appointment_id: int, 
    db: Session = Depends(get_db),
    current_agent: AgentModel = Depends(get_current_agent)
):
    appointment = db.query(AppointmentModel)\
        .filter(
            AppointmentModel.id == appointment_id,
            AppointmentModel.agent_id == current_agent.id  # Security check
        )\
        .first()
    
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    db.delete(appointment)
    db.commit()
    return None

@router.patch("/{appointment_id}/status")
def update_appointment_status(
    appointment_id: int,
    status_update: dict,
    db: Session = Depends(get_db),
    current_agent: AgentModel = Depends(get_current_agent)
):
    appointment = db.query(AppointmentModel)\
        .filter(
            AppointmentModel.id == appointment_id,
            AppointmentModel.agent_id == current_agent.id
        )\
        .first()
    
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if "status" in status_update:
        appointment.status = status_update["status"]
        db.commit()
        db.refresh(appointment)
    
    return appointment