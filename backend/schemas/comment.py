from pydantic import BaseModel
from datetime import datetime
from schemas.user import AuthorOut

class CommentCreate(BaseModel):
    content: str

class CommentUpdate(BaseModel):
    content: str

class CommentOut(BaseModel):
    id: int
    content: str
    author: AuthorOut
    post_id: int
    created_at: datetime

    class Config:
        orm_mode = True