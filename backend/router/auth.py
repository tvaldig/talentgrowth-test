from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from config.db import SessionLocal, get_db
from models.user import User
from schemas.user import UserPass, UserRegister, UserLogin, UserOut, UserUpdate
from schemas.token import Token
from middleware.authentication import AuthHandler

router = APIRouter()
auth = AuthHandler()

@router.post("/register", response_model=Token)
async def register(user: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    hashed_password = auth.get_password_hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token_expires = timedelta(minutes=15)
    access_token = auth.create_access_token(
        data={"sub": new_user.email},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(form_data: UserLogin, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.email, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token_expires = timedelta(minutes=15)
    access_token = auth.create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserOut)
async def read_users_me(current_user: User = Depends(auth.get_current_user)):
    return current_user

@router.put("/me", response_model=UserOut)
async def update_users_me(
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user),
):
    current_user.name = data.name

    db.add(current_user)
    db.commit()
    db.refresh(current_user)

    return current_user

@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(current_user: UserPass = Depends(auth.get_current_user)):
    return {
        "message": "Logged out successfully"
    }