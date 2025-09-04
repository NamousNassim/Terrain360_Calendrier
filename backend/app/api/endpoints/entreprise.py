from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db
from app.schemas.schemas import Company, CompanyCreate
from app.models.models import Company as CompanyModel

router = APIRouter(
    prefix="/companies",
    tags=["companies"]
)

@router.post("/", response_model=Company, status_code=status.HTTP_201_CREATED)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    db_company = CompanyModel(
        client_name=company.client_name,
        notes=company.notes,
        location=company.location,
        contact_email=company.contact_email,
        contact_phone=company.contact_phone
    )
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

@router.get("/", response_model=List[Company])
def read_companies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Add ORDER BY clause for SQL Server compatibility
    companies = db.query(CompanyModel)\
        .order_by(CompanyModel.id)\
        .offset(skip)\
        .limit(limit)\
        .all()
    return companies

@router.get("/{company_id}", response_model=Company)
def read_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).filter(CompanyModel.id == company_id).first()
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@router.put("/{company_id}", response_model=Company)
def update_company(company_id: int, company: CompanyCreate, db: Session = Depends(get_db)):
    db_company = db.query(CompanyModel).filter(CompanyModel.id == company_id).first()
    if db_company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    
    for key, value in company.dict().items():
        setattr(db_company, key, value)
    
    db.commit()
    db.refresh(db_company)
    return db_company

@router.delete("/{company_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).filter(CompanyModel.id == company_id).first()
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    
    db.delete(company)
    db.commit()
    return None