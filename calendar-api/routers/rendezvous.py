from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db_connection import get_session
from models import RendezVous as RendezVousModel, User as UserModel
from schemas import RendezVous, RendezVousCreate
from utils.auth import require_role

router = APIRouter(prefix="/rendezvous", tags=["RendezVous"])

# Create rendezvous
@router.post("/", response_model=RendezVous)
def create_rendezvous(rdv: RendezVousCreate, session: Session = Depends(get_session)):
    if rdv.user_id:
        user = session.query(UserModel).filter(UserModel.id == rdv.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    db_rdv = RendezVousModel(**rdv.dict())
    session.add(db_rdv)
    session.commit()
    session.refresh(db_rdv)
    return db_rdv

# List all rendezvous
@router.get("/", response_model=List[RendezVous])
def list_rendezvous(session: Session = Depends(get_session)):
    rdvs = session.query(RendezVousModel).all()
    return rdvs

# Get rendezvous by ID
@router.get("/{rdv_id}", response_model=RendezVous)
def get_rendezvous(rdv_id: int, session: Session = Depends(get_session)):
    rdv = session.query(RendezVousModel).filter(RendezVousModel.id == rdv_id).first()
    if not rdv:
        raise HTTPException(status_code=404, detail="Rendez-vous non trouvé")
    return rdv

# Delete rendezvous
@router.delete("/{rdv_id}")
def delete_rendezvous(rdv_id: int, session: Session = Depends(get_session)):
    rdv = session.query(RendezVousModel).filter(RendezVousModel.id == rdv_id).first()
    if not rdv:
        raise HTTPException(status_code=404, detail="Rendez-vous non trouvé")
    session.delete(rdv)
    session.commit()
    return {"ok": True}
