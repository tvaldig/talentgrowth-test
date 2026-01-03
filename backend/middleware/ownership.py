from fastapi import HTTPException, status

def check_owner(resource_user_id: int, current_user):
    if resource_user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized access"
        )