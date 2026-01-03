from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from middleware.authentication import AuthHandler

auth = AuthHandler()

class JWTHandler:
    def __init__(self, required_roles: list[str] | None = None):
        self.required_roles = required_roles or []

    def __call__(
        self,
        user = Depends(auth.get_current_user),
    ):
        if self.required_roles and user.role not in self.required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to access this resource",
            )
        return user
