from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from dotenv import load_dotenv, find_dotenv
import os

from config.db import SessionLocal
from models.user import User
from schemas.user import UserPass
from schemas.token import TokenData

load_dotenv(find_dotenv())

SECRET_KEY = os.getenv("KEY")
ALGORITHM = "HS256"

security = HTTPBearer()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class AuthHandler:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # Password hashing
    def get_password_hash(self, password: str) -> str:
        return self.pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)

    # Authenticate user
    def authenticate_user(self, db: Session, email: str, password: str):
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not self.verify_password(password, user.password_hash):
            return None
        return user

    # Create JWT
    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
        to_encode.update({"exp": expire})

        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    # Get user from token
    def get_current_user(
        self,
        credentials: HTTPAuthorizationCredentials = Depends(security),
        db: Session = Depends(get_db),
    ) -> UserPass:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

        try:
            payload = jwt.decode(
                credentials.credentials,
                SECRET_KEY,
                algorithms=[ALGORITHM],
            )
            email: str | None = payload.get("sub")
            if email is None:
                raise credentials_exception

            token_data = TokenData(email=email)

        except JWTError:
            raise credentials_exception

        user = db.query(User).filter(User.email == token_data.email).first()
        if not user:
            raise credentials_exception

        return UserPass(
            id=user.id,
            name=user.name,
            email=user.email,
        )

auth = AuthHandler()