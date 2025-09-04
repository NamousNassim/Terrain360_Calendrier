from fastapi import APIRouter
from app.api.endpoints import entreprise,agents,rendezvous

router = APIRouter()
router.include_router(entreprise.router)
router.include_router(agents.router)
router.include_router(rendezvous.router)
