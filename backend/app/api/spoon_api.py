from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from httpx import AsyncClient
from typing import List
from ..schemas.schemas import UserRead, FavoriteRecipeCreate, FavoriteRecipeRead, RecipeSearchResult, RecipeByNutrientsResult, SpoonacularSearchResponse
from ..models.models import FavoriteRecipe, User
from ..db.database import get_db
from ..auth.token import  verify_token
from decouple import config


router = APIRouter()


spoonacular_api_key = config('SP_Key')
spoonacular_base_url = config('Sp_url')

async def get_spoonacular_client():
    async with AsyncClient() as client:
        yield client


def get_user_from_token(token: str, session: Session = Depends(get_db)):
    token_data = verify_token(token, credentials_exception=HTTPException(status_code=401, detail="Invalid credentials"))
    print("Token Data:", token_data)
    user_name = token_data
    user = session.query(User).filter_by(username=user_name).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/recipes/search", response_model=List[dict])
async def search_recipes_by_ingredients(
    ingredients: str,
    client: AsyncClient = Depends(get_spoonacular_client),
):
   
    response = await client.get(
        f"{spoonacular_base_url}/recipes/findByIngredients",
        params={"ingredients": ingredients, "apiKey": spoonacular_api_key},
    )
    response.raise_for_status()

   
    results = response.json()
    return results

@router.post("/recipes/favorite", response_model=FavoriteRecipeRead)
async def save_recipe_as_favorite(
    favorite_recipe: FavoriteRecipeCreate,
    authorization: str = Header(...),
    session: Session = Depends(get_db),
):
    
    token = authorization.replace("Bearer ", "")

    user = get_user_from_token(token, session)

    existing_favorite = session.query(FavoriteRecipe).filter_by(user_id=user.id, recipe_id=favorite_recipe.recipe_id).first()
    if existing_favorite:
        raise HTTPException(status_code=400, detail="Recipe already saved as favorite")

    new_favorite = FavoriteRecipe(**favorite_recipe.dict(), user_id=user.id)
    session.add(new_favorite)
    session.commit()
    session.refresh(new_favorite)

    return new_favorite

@router.get("/recipes/favorite", response_model=List[FavoriteRecipeRead])
async def get_favorite_recipes(
    authorization: str = Header(...),
    session: Session = Depends(get_db),
):
    
    token = authorization.replace("Bearer ", "")
    
    user = get_user_from_token(token, session)

    favorite_recipes = session.query(FavoriteRecipe).filter_by(user_id=user.id).all()

    return favorite_recipes

@router.get("/recipes/findByNutrients", response_model=List[RecipeByNutrientsResult])
async def search_recipes_by_nutrients(
    min_carbs: float,
    max_carbs: float,
    number: int = 5,
    client: AsyncClient = Depends(get_spoonacular_client),
):
    response = await client.get(
        f"{spoonacular_base_url}/recipes/findByNutrients",
        params={"minCarbs": min_carbs, "maxCarbs": max_carbs, "number": number, "apiKey": spoonacular_api_key},
    )
    response.raise_for_status()

    results = response.json()
    return results

@router.get("/recipes/complexSearch", response_model=SpoonacularSearchResponse)
async def search_recipes_complex(
    query: str,
    max_fat: float,
    number: int = 5,
    session: Session = Depends(get_db),
    client: AsyncClient = Depends(get_spoonacular_client),
):
   
    try:
      
        response = await client.get(
            f"{spoonacular_base_url}/recipes/complexSearch",
            params={"query": query, "maxFat": max_fat, "number": number, "apiKey": spoonacular_api_key},
        )
        response.raise_for_status()

        
        results = response.json()
        return SpoonacularSearchResponse(**results)

    except Exception as e:
      
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/recipes/{recipe_id}/information", response_model=dict)
async def get_recipe_information(
    recipe_id: int,
    client: AsyncClient = Depends(get_spoonacular_client),
):
    try:
        response = await client.get(
            f"{spoonacular_base_url}/recipes/{recipe_id}/information",
            params={"apiKey": spoonacular_api_key},
        )
        response.raise_for_status()

        recipe_info = response.json()
       
        result = {
            "name": recipe_info.get("title", ""),
            "image": recipe_info.get("image", ""),
            "steps": []  
        }

        
        if recipe_info.get("analyzedInstructions"):
            
            steps = [
                {"number": step["number"], "step": step["step"]}
                for instruction in recipe_info["analyzedInstructions"]
                for step in instruction.get("steps", [])
            ]
            result["steps"] = steps

        return result

    except HTTPException as e:
        raise e