from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from middleware.authentication import AuthHandler, get_db
from sqlalchemy.orm import Session

security = HTTPBearer()
auth = AuthHandler()

class JWTHandler:
    def __init__(self, required_roles=None):
        self.required_roles = required_roles or []
    
    def __call__(self, credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
        # Explicitly pass both parameters to get_current_user
        user = auth.get_current_user(credentials=credentials, db=db)
        print(user)
        if self.required_roles:
            # Check if user has required roles
            if not any(role in user.roles for role in self.required_roles):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You don't have permission to access this resource",
                )
        
        return user