from sqlalchemy import Column, Integer, String, Boolean, DateTime,ForeignKey
from ..db import database
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func



class User(database.Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    tokens = relationship("TokenTable", back_populates="user")
    favorite_recipes = relationship("FavoriteRecipe", back_populates="user")

class TokenTable(database.Base):
    __tablename__ = "token_table"
    id = Column(Integer, primary_key=True, index=True)
    access_token = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_date = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(Boolean, default=True)
    user = relationship("User", back_populates="tokens")

class FavoriteRecipe(database.Base):
    __tablename__ = "favorite_recipes"
    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="favorite_recipes")
