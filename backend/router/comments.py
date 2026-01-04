from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List

from config.db import SessionLocal, get_db
from models.comment import Comment
from schemas.comment import CommentCreate, CommentUpdate, CommentOut
from middleware.ownership import check_owner
from middleware.authentication import auth
router = APIRouter(tags=["Comments"])


@router.post("/posts/{post_id}/comments", response_model=CommentOut)
def add_comment(
    post_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_user)
):
    db_comment = Comment(
        content=comment.content,
        post_id=post_id,
        author_id=current_user.id
    )

    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


@router.get("/posts/{post_id}/comments", response_model=List[CommentOut])
def get_comments(post_id: int, db: Session = Depends(get_db)):
    return db.query(Comment).options(joinedload(Comment.author)).filter(Comment.post_id == post_id).all()


@router.put("/comments/{comment_id}", response_model=CommentOut)
def update_comment(
    comment_id: int,
    comment: CommentUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_user)
):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not db_comment:
        raise HTTPException(404, "Comment not found")

    check_owner(db_comment.author_id, current_user)

    db_comment.content = comment.content
    db.commit()
    db.refresh(db_comment)
    return db_comment


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(auth.get_current_user)
):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not db_comment:
        raise HTTPException(404, "Comment not found")

    check_owner(db_comment.author_id, current_user)

    db.delete(db_comment)
    db.commit()
