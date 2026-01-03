from typing import List
from pydantic import BaseModel
from datetime import datetime

class PostCreate(BaseModel):
    title: str
    content: str

class PostUpdate(BaseModel):
    title: str | None = None
    content: str | None = None

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class PaginatedPosts(BaseModel):
    total: int
    page: int
    limit: int
    items: List[PostOut]