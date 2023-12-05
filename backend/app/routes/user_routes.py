from fastapi import  APIRouter, Depends, HTTPException
from ..schemas.schemas import UserCreate, UserRead
from ..models.models import User
from ..db.database import Base, SessionLocal, engine
from sqlalchemy.orm import Session
from ..core.hash import Hasher
from typing import List

router = APIRouter()


@router.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your home."}

Base.metadata.create_all(engine)
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

@router.post("/register")
def register_user(user: UserCreate, session: Session = Depends(get_session)):
    existing_user = session.query(User).filter_by(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hasher = Hasher()
    encrypted_password = hasher.get_password_hash(user.password)

    new_user = User(username=user.username, email=user.email, hashed_password=encrypted_password)

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"message": "User created successfully"}

@router.get("/users", response_model=List[UserRead])
def get_users(session: Session = Depends(get_session)):
    users = session.query(User).all()
    return users
