from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from config.db import SessionLocal
from schemas.token import TokenData
from dotenv import load_dotenv, find_dotenv
from datetime import datetime, timedelta
from models.user import User, UserPass
from sqlalchemy.orm import Session
import os

load_dotenv(find_dotenv())
PRIVATE_KEY = os.getenv("KEY")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class AuthHandler():
    pwd = CryptContext(schemes=["bcrypt"])
    def get_password_hash(self, password):
        return self.pwd.hash(password)
    
    def get_user(self, db: Session, email: str):
        user_data = db.query(User).filter(User.email == email).first()

        if user_data is not None:
            # Extract only the relevant fields and handle missing fields
            user_dict = {
                "id": user_data.id,
                "nama": user_data.nama,
                "email": user_data.email,
                "no_telepon": user_data.no_telepon,
                "password": user_data.password_hash,  # Use password_hash as password
                "role": user_data.role,
                # Add other required UserPass fields here
            }
            return UserPass(**user_dict)
    
    def verify_password(self, plain_password, hashed_password):
        return self.pwd.verify(plain_password, hashed_password)
    
    def authenticate_user(self, db: Session, email: str, password: str):
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return False
        if not self.verify_password(password, user.password_hash):
            return False
        return user
    
    def create_access_token(self, data: dict, expires_delta: timedelta):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now() + expires_delta
        else:
            expire = datetime.now() + timedelta(minutes=15)

        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, PRIVATE_KEY)
        
        return encoded_jwt
        
    def get_current_user(self, credentials: HTTPAuthorizationCredentials, db: Session):
        credential_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Could not validate credentials", 
            headers={"WWW-Authenticate": "Bearer"}
        )
        try:
            payload = jwt.decode(credentials.credentials, PRIVATE_KEY)
            email: str = payload.get("sub")
            if email is None:
                raise credential_exception
            
            token_data = TokenData(email=email)    
        except JWTError:
            raise credential_exception
        
        # Note the order of parameters here - db first, then email
        user = self.get_user(db=db, email=token_data.email)
        if user is None:
            raise credential_exception
        
        return user