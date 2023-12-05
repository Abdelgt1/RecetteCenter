from fastapi import APIRouter, Depends, HTTPException, status, Form, Query, Header
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

@router.get("/user/me", response_model=dict)
def get_current_user(
    authorization: str = Header(..., convert_underscores=False),
    session: Session = Depends(get_db),
):
    token = authorization.split("Bearer ")[1]

    try:
        verify_token(token, HTTPException(status_code=401, detail="Invalid credentials"))

        username = verify_token(token, HTTPException(status_code=401, detail="Invalid credentials"))

        if not username:
            raise HTTPException(status_code=422, detail="Invalid token payload")

        user = session.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return {"username": user.username, "email": user.email}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))