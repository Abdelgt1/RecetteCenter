from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session
from ..models.models import User
from ..core.hash import Hasher
from ..auth.token import create_access_token, verify_token
from ..db.database import get_db


router = APIRouter()

@router.post("/login")
def login_for_access_token(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    print("Received login request with username:", username)
    user = db.query(User).filter(User.username == username).first()

    if not user or not Hasher.verify_password(password, user.hashed_password):
        print("Invalid username or password")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.username})
    return {"user": {"username": user.username, "email": user.email}, "access_token": access_token, "token_type": "bearer"}
