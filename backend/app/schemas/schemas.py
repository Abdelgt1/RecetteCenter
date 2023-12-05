from pydantic import BaseModel
import datetime
from typing import Optional, Dict, Union, List

class UserCreate(BaseModel):
    username: str
    email : str
    password : str

class UserRead(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class FavoriteRecipeCreate(BaseModel):
    recipe_id: int

class FavoriteRecipeRead(BaseModel):
    id: int
    recipe_id: int

    class Config:
        orm_mode = True

class NutrientItem(BaseModel):
    name: str
    amount: float
    unit: str
    
class Nutrient(BaseModel):
    name: str
    amount: float
    unit: str

class RecipeSearchResultItem(BaseModel):
    id: int
    title: str
    image: str
    imageType: str
    nutrition: Optional[dict[str, List[Nutrient]]]

class RecipeSearchResult(BaseModel):
    offset: int
    number: int
    results: List[RecipeSearchResultItem]
    totalResults: int


class RecipeByNutrientsResult(BaseModel):
    calories: int
    carbs: str
    fat: str
    id: int
    image: str
    imageType: str
    protein: str
    title: str



class SpoonacularSearchResponse(BaseModel):
    offset: Optional[int]
    number: Optional[int]
    results: Optional[List[RecipeSearchResultItem]]
    totalResults: Optional[int]